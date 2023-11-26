import React from "react";

export default function CreateListing() {
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Creat a Listing
            </h1>
            <form className="flex flex-col  gap-4">
                <div className="flex flex-col flex-1 gap-4">
                    {/* fields */}
                    <input
                        className="border p-3 rounded-lg  border-slate-300"
                        type="text"
                        id="name"
                        maxLength="64"
                        minLength="3"
                        placeholder="Name"
                        required
                    />
                    <textarea
                        className="border p-3 rounded-lg  border-slate-300"
                        id="description"
                        placeholder="Description"
                        required
                    />
                    <input
                        className="border p-3 rounded-lg  border-slate-300"
                        type="text"
                        id="address"
                        placeholder="Address"
                        required
                    />

                    {/* checkboxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="sell" />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="parking"
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="furnished"
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>

                    {/* numbers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                className="border border-slate-300 rounded-lg p-3"
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                placeholder="1"
                                required
                            />
                            <p>Bedrooms</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="border border-slate-300 rounded-lg p-3"
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                placeholder="1"
                                required
                            />
                            <p>Bathrooms</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="border border-slate-300 rounded-lg p-3"
                                type="number"
                                id="regularPrice"
                                min="2000"
                                placeholder="3000"
                                required
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className="text-xs text-slate-600">
                                    ($ / month)
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="border border-slate-300 rounded-lg p-3"
                                type="number"
                                id="discountPrice"
                                min="2000"
                                placeholder="3000"
                                required
                            />
                            <div className="flex flex-col items-center">
                                <p>Discount Price</p>
                                <span className="text-xs text-slate-600">
                                    ($ / month)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* files upload */}
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold">
                            Images :{" "}
                            <span className="font-light text-slate-600 text-sm ml-2">
                                The first image will be the cover (max 6)
                            </span>
                        </p>
                        <div className="flex gap-4">
                            <input
                                className="p-3 border border-slate-300 rounded-lg w-full"
                                type="file"
                                id="images"
                                accept="image/*"
                                multiple
                            />
                            <button className="p-3 text-[#fdfdfd] bg-slate-600 border border-slate-300 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 duration-1000">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
                <button className="p-3 bg-slate-600 rounded-lg text-[#fdfdfd] uppercase border-slate-300 hover:opacity-80 duration-1000 disabled:opacity-80">
                    Create List
                </button>
            </form>
        </main>
    );
}
