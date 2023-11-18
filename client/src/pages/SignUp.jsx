import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7 text-slate-800">
                Sign Up
            </h1>
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg"
                    id="username"
                />
                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                />
                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                />
                <button className="bg-slate-600 text-[#fdfdfd] p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 duration-1000">
                    Sign Up
                </button>
            </form>
            <div className="flex gap-2 mt-4 justify-center">
                <span>Have an account? </span>
                <Link className="text-blue-600" to={"/sign-in"}>
                    Sign In
                </Link>
            </div>
        </div>
    );
}
