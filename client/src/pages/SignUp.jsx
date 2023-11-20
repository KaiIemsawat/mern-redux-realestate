import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Use these instead of each individual input
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate("/sign-in");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7 text-slate-800">
                Sign Up
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    className="bg-slate-600 text-[#fdfdfd] p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 duration-1000"
                    disabled={loading}
                >
                    {loading ? "LOADING..." : "Sign Up"}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-4 justify-center">
                <span>Have an account? </span>
                <Link className="text-blue-600" to={"/sign-in"}>
                    Sign In
                </Link>
            </div>
            {error &&
            (!formData.username || !formData.email || !formData.password) ? (
                <div className="flex gap-2 mt-4 justify-center">
                    <p className="text-red-600 -mt-2">
                        All fields need to be filled
                    </p>
                </div>
            ) : (
                error && (
                    <div className="flex gap-2 mt-4 justify-center">
                        <p className="text-red-600 -mt-2">
                            Invalid Credentials
                        </p>
                    </div>
                )
            )}
        </div>
    );
}
