import { useSelector } from "react-redux";

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7 text-slate-500">
                Profile
            </h1>
            <form className="flex flex-col gap-4">
                <img
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-4"
                    src={currentUser.avatar}
                    alt="avatar"
                />
                <input
                    className="border p-3 rounded-lg"
                    type="text"
                    id="username"
                    placeholder="username"
                />
                <input
                    className="border p-3 rounded-lg"
                    type="email"
                    id="email"
                    placeholder="email"
                />
                <input
                    className="border p-3 rounded-lg"
                    type="password"
                    id="password"
                    placeholder="password"
                />
                <button className="bg-slate-600 text-[#fdfdfd] p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 duration-1000">
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-4">
                <span className="text-red-600 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-slate-600 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
