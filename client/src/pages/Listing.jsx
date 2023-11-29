import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);

    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser, "Current User");
    console.log(listing.userRef, "userRef");
    console.log(currentUser._id);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);

                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchListing();
    }, [params.listingId]);

    return (
        <main>
            {loading && <p className="text-center my-8 text-2xl">Loading...</p>}
            {error && (
                <p className="text-center text-red-600 text-sm my-8">
                    Something went wrong...
                </p>
            )}
            {listing && !loading && !error && (
                <>
                    <Swiper navigation>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-[550px]"
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: "cover",
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 opacity-40 hover:opacity-100 duration-1000 cursor-pointer">
                        <FaShare
                            className="text-slate-500"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    window.location.href
                                );
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}
                        />
                    </div>
                    {copied && (
                        <p className="fixed top-[18%] right-[6%] z-10 rounded-md bg-slate-100 opacity-70 p-2">
                            Link copied
                        </p>
                    )}
                    <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                        <p className="text-2xl font-semibold">
                            {listing.name} - ${" "}
                            {listing.offer
                                ? listing.discountPrice.toLocaleString("en-US")
                                : listing.regularPrice.toLocaleString("en-US")}
                            {listing.type === "rent" && " / month"}
                        </p>
                        <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                            <FaMapMarkerAlt className="text-green-600" />
                            {listing.address}
                        </p>
                        <div className="flex gap-4">
                            <p className="bg-red-800 w-full max-w-[200px] text-[#fdfdfd] text-center p-1 rounded-md">
                                {listing.type === "rent"
                                    ? "For Rent"
                                    : "For Sale"}
                            </p>
                            {listing.offer && (
                                <p className="bg-green-800 w-full max-w-[200px] text-[#fdfdfd] text-center p-1 rounded-md">
                                    $
                                    {+listing.regularPrice -
                                        +listing.discountPrice}{" "}
                                    OFF
                                </p>
                            )}
                        </div>
                        <p className="text-slate-600">
                            <span className="font-semibold text-slate-900">
                                Descriptions -{" "}
                            </span>
                            {listing.description}
                        </p>
                        <ul className="text-slate-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaBed className="text-lg text-green-800" />
                                {listing.bedrooms > 1
                                    ? `${listing.bedrooms} Beds`
                                    : `${listing.bedrooms} Bed`}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaBath className="text-lg text-green-800" />
                                {listing.bathrooms > 1
                                    ? `${listing.bathrooms} Beds`
                                    : `${listing.bathrooms} Bed`}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaParking className="text-lg text-green-800" />
                                {listing.parking
                                    ? "Parking Spot"
                                    : "No Parking"}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap">
                                <FaChair className="text-lg text-green-800" />
                                {listing.furnished
                                    ? "Furnished"
                                    : "Unfurnished"}
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </main>
    );
}
