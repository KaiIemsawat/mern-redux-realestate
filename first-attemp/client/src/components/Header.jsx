import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-slate-500">Zukkii</span>
                        <span className="text-slate-800">Estate</span>
                    </h1>
                </Link>
                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                        type="text"
                        placeholder="Search...."
                    />
                    <FaSearch className="text-slate-400 hover:text-slate-600" />
                </form>
                <ul className="flex gap-4">
                    <Link to="/">
                        <li className="hidden sm:inline text-slate-400 hover:text-slate-600 hover:underline cursor-pointer">
                            Home
                        </li>
                    </Link>
                    <Link to="about">
                        <li className="hidden sm:inline text-slate-400 hover:text-slate-600 hover:underline cursor-pointer">
                            About
                        </li>
                    </Link>
                    {currentUser ? (
                        <Link to="/profile">
                            <img
                                className="rounded-full h-7 w-7 object-cover hover:opacity-80 duration-1000"
                                src={currentUser.avatar}
                                alt="profile"
                            />
                        </Link>
                    ) : (
                        <Link to="/sign-in">
                            <li className="sm:inline text-slate-400 hover:text-slate-600 hover:underline cursor-pointer">
                                Sign in
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </header>
    );
}