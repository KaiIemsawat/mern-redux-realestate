import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const Home = () => {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    SwiperCore.use([Navigation]);

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch("/api/listing/get?offer=true&limit=4");
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRentListings = async () => {
            try {
                const res = await fetch("/api/listing/get?type=rent&limit=4");
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSaleListings = async () => {
            try {
                const res = await fetch("/api/listing/get?type=sale&limit=4");
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferListings();
    }, []);
    return (
        <div>
            {/* Top */}
            <div className="px-2 pt-16 max-w-6xl m-auto">
                <h1 className="font-bold text-3xl md:text-6xl text-secondary-400">
                    Find your next{" "}
                    <span className="text-primary-500">perfect</span> home,
                    <br /> with ease...
                </h1>
                <div className="mt-4 mb-16">
                    <p className="text-secondary-400 font-light text-sm">
                        Zukkii Estate is the best place to find your truly dream
                        home.
                    </p>
                    <p className="text-secondary-400 font-light text-sm">
                        We have various selections home that will definitely
                        match what you are looking for. In just a few clicks,
                        your next comfy home will be in front of you
                    </p>
                </div>
                <Link
                    className="text-primary-500 font-semibold text-lg hover:text-effect-300 overflow-hidden truncate w-32 sm:w-52"
                    to={"/search"}
                >
                    START HERE...
                </Link>
            </div>

            {/* Swiper */}
            {offerListings && offerListings.length > 0 && (
                <Swiper
                    className="my-24"
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    modules={[Pagination]}
                >
                    {offerListings.map((listing) => (
                        <SwiperSlide key={listing._id}>
                            <div
                                className="h-[360px] w-full bg-slate-100"
                                key={listing._id}
                            >
                                <img
                                    className="object-cover w-full h-[480px]"
                                    src={listing.imageUrls[0]}
                                    alt="cover image"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            {/* Listing result for offer, sale and rent */}
        </div>
    );
};
export default Home;
