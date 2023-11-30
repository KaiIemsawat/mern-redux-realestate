import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(204, "Listing not found..!"));
    }
    if (req.user.id !== listing.userRef) {
        return next(
            errorHandler(401, "You can only delete your own listing..")
        );
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("The listing has been deleted");
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!!!listing) {
            return next(errorHandler(500, "Internal error"));
        }
        if (!listing) {
            return next(errorHandler(404, "Listing not found..!"));
        }
        if (req.user.id !== listing.userRef) {
            return next(
                errorHandler(401, "You can only update your own listing..")
            );
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404), "Lising not found");
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

// --- SEARCH ---
export const getListings = async (req, res, next) => {
    try {
        // If no limit query params, use 9
        const limit = parseInt(req.query.limit) || 9;
        // If no specific start index, use index 0
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        // If the value of 'offer' equals to 'undefined' or 'false'
        // assign the value of 'offer' with both 'false' and 'true' (from database)
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === "false") {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === "all") {
            type = { $in: ["sell", "rent"] };
        }

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const listings = await Listing.find({
            // '$regex' is mongoDB build-in
            // '$options: 'i' means to ignore upper or lower cases
            name: { $regex: searchTerm, $options: "i" },
            offer,
            furnished,
            parking,
            type,
        })
            .sort({
                // sort 'createdAt' by 'order'
                [sort]: order,
            })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};
