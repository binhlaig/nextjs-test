"use client";

import "@/styles/register.scss"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });

    const handlechange = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value,
        });
    }
    console.log(formData);

    const router = useRouter();
    const [passwordMatch, setPasswordMatch] = useState(true);
    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const registerForm = new FormData();

            for (var key in formData) {
                registerForm.append(key, formData[key]);
            }

            const response = await fetch("/api/register/", {
                method: "POST",
                body: registerForm,
            });
            if (response.ok) {
                router.push("/login");
            }

        } catch (err) {
            console.log("Registration failed", err.message);
        }
    }
    return (
        <div className="register">
            <div className="register_content">
                <form onSubmit={handleSubmit} className="register_content_form">
                    <input placeholder="Username" name="username" value={formData.username}  onChange={handlechange} required />
                    <input type="email" placeholder="Email" name="email" value={formData.email}  onChange={handlechange} required />
                    <input type="password" placeholder="Password"  name="password" value={formData.password} onChange={handlechange} required />

                    <input placeholder="Comfirm Password" value={formData.confirmPassword}
                        name="confirmPassword" onChange={handlechange} required />

                    {!passwordMatch && (
                        <p style={{ color: "red" }}>Passwords are not matched!</p>
                    )}
                    <input id="image" type="file" name="profileImage" accept="image/*" style={{ display: "none" }}
                        required onChange={handlechange} />
                    <label htmlFor="image">
                        <img src="/assets/addImage.png" alt="add profile" />
                        <p>Upload Profile Photo</p>
                    </label>
                    {formData.profileImage && (
                        <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Profile"
                            style={{ maxWidth: "80px", maxHeight: "100px" }}
                        />
                    )}
                    <button type="submit" disabled={!passwordMatch}>Register</button>
                </form>

                <button type="button" className="google">
                    Log In with Google
                    <FcGoogle />
                </button>
                <a href="/login"> Already to register?</a>

            </div>
        </div>
    )
}

export default RegisterPage