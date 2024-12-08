"use client";
import { login } from "@/components/action";
import { useFormState } from "react-dom";
const loginForm = () => {
    const [state, formAction] = useFormState(login, undefined);
    return (
       
            <form className="login_content_form" action={formAction}>
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    required
                />
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    required
                />
                <p className="error">{state && state}   </p>  
                <button type="submit">Log In</button>
               
            </form>
           
       
    )
}

export default loginForm