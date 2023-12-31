const SignUp = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold text-primary-500 my-7">
                Sign Up
            </h1>
            <form className="flex flex-col gap-4">
                <input
                    className="border p-3 rounded-lg focus:outline-none bg-transparent"
                    id="username"
                    type="text"
                    placeholder="username"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none bg-transparent"
                    id="email"
                    type="email"
                    placeholder="email"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none bg-transparent"
                    id="password"
                    type="password"
                    placeholder="password"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none bg-transparent"
                    id="confirm password"
                    type="password"
                    placeholder="confirm password"
                />
                <button className="bg-primary-500 text-effect-500 p-3 rounded-lg uppercase hover:bg-effect-500 hover:text-primary-500 duration-200">
                    Sign Up
                </button>
            </form>
        </div>
    );
};
export default SignUp;
