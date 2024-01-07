const Search = () => {
    return (
        <div className="flex flex-col md:flex-row">
            {/* Left section */}
            <div className="p-7 border-b-2 md:border-b-0 md:border-r-2 md:min-h-screen">
                <form className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="whitespace-nowrap font-semibold text-primary-500">
                            Search Term:
                        </label>
                        <input
                            className="border rounded-lg p-3 w-full"
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                        />
                    </div>

                    {/* Types */}
                    <div className="flex flex-col gap-2">
                        <label className=" font-semibold text-primary-500">
                            Type:
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-2 gap-x-4">
                            <div className="flex gap-2 items-center">
                                <input
                                    className="w-5"
                                    type="checkbox"
                                    id="all"
                                />
                                <span className="text-secondary-700">
                                    Rent & Sale
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    className="w-5"
                                    type="checkbox"
                                    id="rent"
                                />
                                <span className="text-secondary-700">Rent</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    className="w-5"
                                    type="checkbox"
                                    id="sale"
                                />
                                <span className="text-secondary-700">Sale</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    className="w-5"
                                    type="checkbox"
                                    id="offer"
                                />
                                <span className="text-secondary-700">
                                    Offer
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-col gap-2">
                        <label className=" font-semibold text-primary-500">
                            Amenities:
                        </label>
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="flex gap-2 items-center">
                                <input
                                    className="w-5"
                                    type="checkbox"
                                    id="parking"
                                />
                                <span className="text-secondary-700">
                                    Parking Lot
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    className="w-5"
                                    type="checkbox"
                                    id="furnished"
                                />
                                <span className="text-secondary-700">
                                    Furnished
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="flex flex-col gap-2">
                        <label className=" font-semibold text-primary-500">
                            Sort:
                        </label>
                        <select
                            className="border rounded-lg p-3 w-full"
                            id="sort_order"
                        >
                            <option value="" disabled selected>
                                Sorting By...
                            </option>
                            <option>Price : High to Low</option>
                            <option>Price : High to Low</option>
                            <option>Lastest First</option>
                            <option>Oldest First</option>
                        </select>
                    </div>
                    <button className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase hover:bg-effect-300 hover:text-primary-500 duration-200">
                        Search
                    </button>
                </form>
            </div>

            {/* Right section */}
            <div className="p-7">
                <h2 className="text-3xl font-semibold text-primary-500">
                    Listing Results:
                </h2>
            </div>
        </div>
    );
};
export default Search;
