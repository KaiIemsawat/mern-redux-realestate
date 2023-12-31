import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-end font-semibold text-primary-500 mt-7 mb-4">
                Sign Up
            </h1>
            <form className="flex flex-col gap-4">
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="username"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="email"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="password"
                    type="password"
                    placeholder="password"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="confirm password"
                    type="password"
                    placeholder="confirm password"
                />
                <button className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase hover:bg-effect-300 hover:text-primary-500 duration-200">
                    Sign Up
                </button>
            </form>
            <div className="flex gap-2 mt-4">
                <p>Have an account ? </p>
                <Link to={"/sign-in"}>
                    <span className="text-primary-500 hover:text-effect-300 duration-200">
                        Sign in
                    </span>
                </Link>
            </div>
        </div>
    );
};
export default SignUp;
