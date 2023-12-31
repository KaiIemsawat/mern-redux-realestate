import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
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
                        <li className="hidden sm:inline text-primary-800 hover:underline hover:text-primary-500">
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="hidden sm:inline text-primary-800 hover:underline hover:text-primary-500">
                            About
                        </li>
                    </Link>
                    <Link to="/sign-in">
                        <li className="sm:inline text-primary-800 hover:underline hover:text-primary-500">
                            Sign in
                        </li>
                    </Link>
                </ul>
            </div>
        </header>
    );
};
export default Header;
