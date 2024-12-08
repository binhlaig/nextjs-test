import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { authConfig } from "./authconfig"
import { connectToDB } from "@/mongodb/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";


const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ email: credentials.email });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};
export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
  CredentialsProvider({
    async authorize(credentials) {
      try {
        const user = await login(credentials);
        return user;
      } catch (err) {
        return null;
      }
    }

  })
  ],

  secret: process.env.AUTH_SECRET,


  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      session.user = { ...session.user, ...sessionUser._doc }

      return session;
    },

    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      if (account.provider === 'github') {
        connectToDB();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              profileImagePath: profile.avatar_url,
            });

            await newUser.save();
          }
          return session;

        } catch (err) {
          console.log(err);
          return false
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  }
});
