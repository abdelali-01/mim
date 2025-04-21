import Product from "../models/Product.js";
import express from "express";
import { rolePermissions } from "../utils/middlewares/adminPermissions.js";

const router = express.Router();

// Create a new product
router.post(
    "/",
    rolePermissions(["super", "sub-super" , "manager"]),
    async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(201).json({
                success: true,
                product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update a product
router.put(
    "/:id",
    rolePermissions("super", "sub-super" , "manager"),
    async (req, res) => {
        try {
            let product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            res.status(200).json({
                success: true,
                product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);

// Delete a product
router.delete(
    "/:id",
    rolePermissions("super", "sub-super" , "manager"),
    async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            await product.remove();
            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);

export default router;