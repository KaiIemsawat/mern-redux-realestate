import { errorHandle } from "../middleware/errorHandle.js";
import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    const { name } = req.body;
    // console.log("INPUT NAME ---- ", name);

    const isNameUsed = await Listing.findOne({ name });
    if (isNameUsed) {
        return next(errorHandle(400, "Listing name has been used"));
    }
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
        return next(errorHandle(404, "Listing not found"));
    }

    if (req.user.userId !== listing.userRef) {
        return next(errorHandle(401, "You may only delete your own listings"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted!");
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandle(404, "Listing not found..!"));
    }
    if (req.user.userId !== listing.userRef) {
        return next(errorHandle(401, "You may only edit your own listings..!"));
    }

    try {
        const updated_Listing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (req.body.discountPrice > req.body.regularPrice) {
            return next(
                errorHandle(422, "Discount Price can't exceed Regular Price")
            );
        }
        res.status(200).json(updated_Listing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandle(404, "Listing not found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};
