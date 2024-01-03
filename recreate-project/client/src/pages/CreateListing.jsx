const CreateListing = () => {
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl text-end font-semibold text-primary-500 mt-7 mb-4">
                Create Listing
            </h1>
            <form className="flex flex-col">
                <div className="flex flex-col gap-4">
                    {/* Fields */}
                    <input
                        className="border p-3 rounded-lg focus:outline-none"
                        id="name"
                        type="text"
                        placeholder="name"
                        maxLength="60"
                        minLength="2"
                        required
                        // onChange={handleChange}
                    />
                    <textarea
                        className="border p-3 rounded-lg focus:outline-none"
                        id="description"
                        type="text"
                        placeholder="description"
                        required
                        // onChange={handleChange}
                    />
                    <input
                        className="border p-3 rounded-lg focus:outline-none"
                        id="address"
                        type="text"
                        placeholder="address"
                        required
                        // onChange={handleChange}
                    />

                    {/* Checkboxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-2">
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="sale" />
                            <span className="text-primary-500 font-semibold">
                                Sell
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="rent" />
                            <span className="text-primary-500 font-semibold">
                                Rent
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="parking"
                            />
                            <span className="text-primary-500 font-semibold">
                                Parking
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="furnished"
                            />
                            <span className="text-primary-500 font-semibold">
                                Furnished
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="offer" />
                            <span className="text-primary-500 font-semibold">
                                Offer
                            </span>
                        </div>
                    </div>

                    {/* Bed / Bath / Prices */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                className="border rounded-lg p-3"
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                required
                            />
                            <p className="text-primary-500 font-semibold">
                                Bedrooms
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="border rounded-lg p-3"
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                required
                            />
                            <p className="text-primary-500 font-semibold">
                                Bathrooms
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="border rounded-lg p-3"
                                type="number"
                                id="regularPrice"
                                min="2000"
                                required
                            />
                            <p className="text-primary-500 font-semibold">
                                Regular Price&nbsp;
                                <span className="font-light text-secondary-400 text-sm">
                                    ($ / month)
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="border rounded-lg p-3"
                                type="number"
                                id="discountPrice"
                                min="1500"
                                required
                            />
                            <p className="text-primary-500 font-semibold">
                                Discount Price&nbsp;
                                <span className="font-light text-secondary-400 text-sm">
                                    ($ / month)
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Image file uploader */}
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold text-primary-500">
                            Images :&nbsp;
                            <span className="font-light text-secondary-400 text-sm">
                                Maximum 6 images (The first image will be the
                                cover)
                            </span>
                        </p>
                        <div className="flex gap-4">
                            <label
                                className="flex-1 text-center font-semibold border border-secondary-400 hover:border-effect-300 hover:text-primary-300 rounded-lg uppercase cursor-pointer p-3 text-primary-500 duration-200"
                                htmlFor="images"
                            >
                                Select Image(s)
                            </label>
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                multiple
                                hidden
                            />
                            <button className="font-semibold border border-optional-400 hover:border-effect-300 hover:text-primary-300 rounded-lg uppercase cursor-pointer p-3 text-primary-500 duration-200">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
                <button className="bg-primary-500 text-effect-300 p-3 rounded-lg uppercase hover:bg-effect-300 hover:text-primary-500 duration-200 mt-4">
                    Submit listing
                </button>
            </form>
        </main>
    );
};
export default CreateListing;
