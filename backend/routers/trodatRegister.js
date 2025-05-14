import express from "express";
import TrodatRegister from "../models/TrodatRegister.js";
import { rolePermissions } from "../utils/middlewares/adminPermissions.js";

const router = express.Router();

// GET: Fetch all trodat register pages and group monthly
router.get("/", rolePermissions(["super", "sub-super" , "manager"]), async (req, res) => {
  try {
    const allPages = await TrodatRegister.find();
    if (!allPages) {
      return res.status(404).json({ message: "Trodat register pages not found!" });
    }

    const registers = await TrodatRegister.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          trodatSells: { $sum: "$trodatSells" },
          total: { $sum: "$total" },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.status(200).json({
      message: "success",
      pages: allPages,
      registers,
    });
  } catch (error) {
    console.error("Error fetching trodat register:", error);
    res.status(400).json({ message: error.message });
  }
});

// POST: Create a new register
router.post("/", rolePermissions(["super", "sub-super"]), async (req, res) => {
  try {
    const newPage = new TrodatRegister(); // auto totals from hook
    const saved = await newPage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Add / Update / Remove order entries
router.put("/:id", rolePermissions(["super", "sub-super" , 'manager']), async (req, res) => {
  try {
    const { addOrder, updateOrder, removeOrderId } = req.body;

    const page = await TrodatRegister.findById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });

    // Add new order
    if (addOrder) {
      page.orders.push(addOrder);
    }

    // Update specific order by _id
    if (updateOrder && updateOrder._id) {
      const orderToUpdate = page.orders.id(updateOrder._id);
      if (orderToUpdate) {
        const { _id, ...rest } = updateOrder;
        Object.assign(orderToUpdate, rest);
      } else {
        console.warn("Order not found for update:", updateOrder._id);
      }
    }

    // Remove order by _id
    if (removeOrderId) {
      page.orders = page.orders.filter(
        (order) => order._id.toString() !== removeOrderId
      );
    }

    const updated = await page.save(); // hook will re-calculate totals
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Set isCompleted to true for a specific order
router.put("/:id/complete-order/:orderId", rolePermissions(["super", "sub-super" , "manager"]), async (req, res) => {
  try {
    const { id, orderId } = req.params;

    const page = await TrodatRegister.findById(id);
    if (!page) return res.status(404).json({ error: "Register page not found" });

    const order = page.orders.id(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.isCompleted = true;

    const updated = await page.save();
    res.status(200).json({ message: "Order marked as completed", data: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE
router.delete("/:id", rolePermissions(["super", "sub-super"]), async (req, res) => {
  try {
    const deletedPage = await TrodatRegister.findByIdAndDelete(req.params.id);
    if (!deletedPage) {
      return res.status(404).json({ message: "Page not found!" });
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
