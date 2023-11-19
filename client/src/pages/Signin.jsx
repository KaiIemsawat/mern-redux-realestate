import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from "../redux/user/userSlice";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    const { loading, error } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Use these instead of each individual input
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            // setLoading(true);
            dispatch(signInStart());
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {
                // setLoading(false);
                // setError(data.message);
                dispatch(signInFailure(data.message));
                return;
            }
            // setLoading(false);
            // setError(null);
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            // setLoading(false);
            // setError(error.message);
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7 text-slate-800">
                Sign In
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                    {loading ? "LOADING..." : "Sign In"}
                </button>
            </form>
            <div className="flex gap-2 mt-4 justify-center">
                <span>Need an account? </span>
                <Link className="text-blue-600" to={"/sign-up"}>
                    Sign Up
                </Link>
            </div>
            {error && (!formData.email || !formData.password) ? (
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
