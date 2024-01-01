import { useSelector } from "react-redux";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="p-3 max-w-lg mx-auto">
            <div className="flex justify-between mt-7 mb-4 items-center">
                <img
                    className="rounded-full h-24 w-24 object-cover cursor-pointer"
                    src={currentUser.avatar}
                    alt="profile img"
                />
                <h1 className="text-3xl text-end font-semibold text-primary-500">
                    {currentUser.username}
                </h1>
            </div>
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
                    type="text"
                    placeholder="email"
                />
                <input
                    className="border p-3 rounded-lg focus:outline-none"
                    id="password"
                    type="text"
                    placeholder="password"
                />
                <button className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase hover:bg-effect-300 hover:text-primary-500 duration-200">
                    update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-primary-500 hover:text-error duration-200 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-primary-500 hover:text-warning duration-200 cursor-pointer">
                    Sign out
                </span>
            </div>
        </div>
    );
};
export default Profile;
