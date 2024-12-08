
import "@/styles/Login.scss"
import { FaGithubSquare } from "react-icons/fa";
import { handleGithubLogin } from "@/components/action";
import { auth } from "@/app/lib/auth";
import LoginForm from "../ui/loginForm/loginForm";


const LoginPage = async () => {
  const session = await auth();
  console.log(session);
  
  return (
    <div className="login">

      <div className="login_content">
        <LoginForm/> 
        <form action={handleGithubLogin}>
          <button className="google" >
            <p>Log In with Githup</p>
            <FaGithubSquare />
          </button>
        </form>

        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  )
}

export default LoginPage