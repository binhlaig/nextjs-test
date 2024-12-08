"use server"
import { signIn, signOut } from "@/app/lib/auth";


export const handleGithubLogin = async () => {
    "use server";
    await signIn("github")
};
export const handleLogout = async () => {
    "use server";
    await signOut();
  };
  export const login = async (prevState, formData) => {
    const { email, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { email, password });
    } catch (err) {
        return "Invalid username or password" ;
    }
  };