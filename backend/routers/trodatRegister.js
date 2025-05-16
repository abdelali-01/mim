import express from "express";
import TrodatRegister from "../models/TrodatRegister.js";
import { rolePermissions } from "../utils/middlewares/adminPermissions.js";
import TamponTable from "../models/TamponStockTable.js";

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
router.put("/:id", rolePermissions(["super", "sub-super", "manager"]), async (req, res) => {
  try {
    const { addOrder, updateOrder, removeOrderId } = req.body;

    const page = await TrodatRegister.findById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });

    const tamponStock = await TamponTable.findOne(); // assuming you have one table

    // 🔵 Add Order
    if (addOrder) {
      page.orders.push(addOrder);

      // Subtract from stock
      const item = tamponStock.table.find(i => i.model === addOrder.model);
      if (item) {
        item.quantity -= addOrder.quantity;
      }
    }

    // 🟡 Update Order
    if (updateOrder && updateOrder._id) {
      const orderToUpdate = page.orders.id(updateOrder._id);

      if (orderToUpdate) {
        const prevQuantity = orderToUpdate.quantity;
        const prevModel = orderToUpdate.model;

        const newQuantity = updateOrder.quantity;
        const newModel = updateOrder.model;

        const quantityDiff = newQuantity - prevQuantity;

        // Adjust stock if model stayed the same
        if (prevModel === newModel) {
          const item = tamponStock.table.find(i => i.model === newModel);
          if (item) {
            item.quantity -= quantityDiff; // +diff means subtract more, -diff means add back
          }
        } else {
          // If model changed, return old quantity to old model, subtract new quantity from new model
          const oldItem = tamponStock.table.find(i => i.model === prevModel);
          const newItem = tamponStock.table.find(i => i.model === newModel);

          if (oldItem) oldItem.quantity += prevQuantity;
          if (newItem) newItem.quantity -= newQuantity;
        }

        // Save the update in the order
        const { _id, ...rest } = updateOrder;
        Object.assign(orderToUpdate, rest);
      } else {
        console.warn("Order not found for update:", updateOrder._id);
      }
    }

    // 🔴 Remove Order
    if (removeOrderId) {
      const orderToRemove = page.orders.find((o) => o._id.toString() === removeOrderId);
      if (orderToRemove) {
        // Return quantity to stock
        const item = tamponStock.table.find(i => i.model === orderToRemove.model);
        if (item) {
          item.quantity += orderToRemove.quantity;
        }
      }

      // Remove the order
      page.orders = page.orders.filter((order) => order._id.toString() !== removeOrderId);
    }

    await tamponStock.save();
    const updated = await page.save();

    res.status(200).json(updated);
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
