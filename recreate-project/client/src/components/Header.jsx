import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <header className="bg-secondary-100 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className="font-bold text-md sm:text-xl flex flex-wrap">
                        <span className="text-primary-500">Zukkii</span>
                        <span className="text-primary-800">Estate</span>
                    </h1>
                </Link>
                <form className="bg-secondary-50 p-3 rounded-lg flex items-center">
                    <input
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                        type="text"
                        placeholder="search"
                    />
                    <FaSearch className="text-primary-500" />
                </form>
                <ul className="flex gap-4">
                    <Link to="/">
                        <li className="hidden sm:inline text-primary-500 hover:text-effect-300 duration-200">
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="hidden sm:inline text-primary-500 hover:text-effect-300 duration-200">
                            About
                        </li>
                    </Link>
                    {currentUser ? (
                        <Link to="/profile">
                            <img
                                className="rounded-full h-7 w-7 object-cover"
                                src={currentUser.avatar}
                                alt="profile"
                            ></img>
                        </Link>
                    ) : (
                        <Link to="/sign-in">
                            <li className="sm:inline text-primary-500 hover:text-effect-300 duration-200">
                                Sign in
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </header>
    );
};
export default Header;
