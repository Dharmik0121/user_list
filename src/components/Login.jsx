import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email !== "eve.holt@reqres.in" || password !== "cityslicka") {
            setError("Invalid credentials. Please try again.");
            return;
        }
        try {
            const response = await axios.post("https://reqres.in/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/users");
        } catch (err) {
            console.log(err);
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="flex mt-15 items-center justify-center">
            {/* Left Section - Form */}
            <div className="flex-1 max-w-md p-8">
                <h1 className="text-4xl font-bold text-gray-800"><span className="text-indigo-600 underline">Login</span></h1>
                <form onSubmit={handleLogin} className="mt-8 space-y-6">
                    <div>
                        <label className="block flex justify-start font-bold text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="username@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block flex justify-start font-bold text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                    >
                        Signin
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            </div>

            {/* Right Section - Illustration */}
            <div className="hidden lg:flex flex-1 justify-center items-center">
                <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?t=st=1743236683~exp=1743240283~hmac=3eea4a99b7e90436b43dcf3189daaf1989e3d0e8e3363844bc95c3c42d098d65&w=826" alt="Illustration" className="max-w-sm" />
            </div>
        </div>
    );
};

export default Login;