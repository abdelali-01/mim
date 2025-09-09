import express from "express";
import TrodatRegister from "../models/TrodatRegister.js";
import CashRegister from "../models/CashRegister.js";
import { rolePermissions } from "../utils/middlewares/adminPermissions.js";
import TamponTable from "../models/TamponStockTable.js";

const router = express.Router();

// Helper function to get or create today's cash register
async function getOrCreateTodayCashRegister() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let cashRegister = await CashRegister.findOne({
    date: {
      $gte: today,
      $lt: tomorrow
    }
  });

  if (!cashRegister) {
    cashRegister = new CashRegister();
    await cashRegister.save();
  }

  return cashRegister;
}

// Helper function to add trodat payment to cash register
async function addTrodatPaymentToCashRegister(orderId, prePayment, isAuto) {
  // Only add to cash register if there's a prePayment and isAuto is true
  if (prePayment > 0 && isAuto) {
    const cashRegister = await getOrCreateTodayCashRegister();
    
    cashRegister.items.push({
      title: "Trodat",
      category: "T",
      price: prePayment,
      orderId: orderId
    });

    await cashRegister.save();
  }
}

// Helper function to update trodat payment in cash register
async function updateTrodatPaymentInCashRegister(orderId, newPrePayment, addedPayment , isAuto) {
  // Only update cash register if isAuto is true
  if (isAuto) {
    const cashRegister = await getOrCreateTodayCashRegister();
    
    const existingItem = cashRegister.items.find(item => 
      item.orderId == orderId && item.title === "Trodat"
    );
    

    if (existingItem) {
      if (newPrePayment > 0) {
        // Update existing entry with new prePayment
        existingItem.price = newPrePayment;
      } else {
        // Remove the entry if new prePayment is 0
        cashRegister.items = cashRegister.items.filter(item => item.orderId !== orderId);
      }
      await cashRegister.save();
    } else if (newPrePayment > 0) {
      // Add new entry only if prePayment is greater than 0
      cashRegister.items.push({
        title: "Trodat",
        category: "T",
        price: addedPayment,
        orderId: orderId
      });
      await cashRegister.save();
    }
  }
}

// Helper function to remove trodat payment from cash register
async function removeTrodatPaymentFromCashRegister(orderId, prePayment, isAuto) {
  // Only add negative entry if there was a prePayment and isAuto is true
  if (prePayment > 0 && isAuto) {
    const cashRegister = await getOrCreateTodayCashRegister();
    
    // Add a negative entry for the removed payment
    cashRegister.items.push({
      title: "Trodat",
      category: "T",
      price: -prePayment,
      orderId: orderId
    });

    await cashRegister.save();
  }
}

// GET: Fetch all trodat register pages and group monthly
router.get("/",  async (req, res) => {
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
    const { date } = req.body;
    const newPage = new TrodatRegister();
    
    if (date) {
      // Create date at noon to avoid timezone issues
      const inputDate = new Date(date);
      inputDate.setHours(12, 0, 0, 0);
      newPage.date = inputDate;
      newPage.isAuto = false; // Set isAuto to false when date is manually provided
    }
    
    const saved = await newPage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Add / Update / Remove order entries
router.put("/:id", async (req, res) => {
  try {
    const { addOrder, updateOrder, removeOrderId } = req.body;

    const page = await TrodatRegister.findById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });

    const tamponStock = await TamponTable.findOne();

    // Add Order
    if (addOrder) {
      page.orders.push(addOrder);
      const orderId = page.orders[page.orders.length - 1]._id;
      
      // Add to cash register only if isAuto is true
      await addTrodatPaymentToCashRegister(orderId, addOrder.prePayment, page.isAuto);

      // Subtract from stock
      const item = tamponStock.table.find(i => i.model === addOrder.model);
      if (item) {
        item.quantity -= addOrder.quantity;
      }
    }

    // Update Order
    if (updateOrder && updateOrder._id) {
      const orderToUpdate = page.orders.id(updateOrder._id);

      if (orderToUpdate) {
        const prevQuantity = orderToUpdate.quantity;
        const prevModel = orderToUpdate.model;
        const prevPrePayment = orderToUpdate.prePayment;

        const newQuantity = updateOrder.quantity;
        const newModel = updateOrder.model;
        const newPrePayment = updateOrder.prePayment;

        // Update cash register with new prePayment only if isAuto is true
        if (prevPrePayment !== newPrePayment) {
          await updateTrodatPaymentInCashRegister(updateOrder._id.toString(), newPrePayment, newPrePayment - prevPrePayment , page.isAuto);
        }

        const quantityDiff = newQuantity - prevQuantity;

        // Adjust stock if model stayed the same
        if (prevModel === newModel) {
          const item = tamponStock.table.find(i => i.model === newModel);
          if (item) {
            item.quantity -= quantityDiff;
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

    // Remove Order
    if (removeOrderId) {
      const orderToRemove = page.orders.find((o) => o._id.toString() === removeOrderId);
      if (orderToRemove) {
        // Add negative entry to cash register only if isAuto is true
        await removeTrodatPaymentFromCashRegister(removeOrderId, orderToRemove.prePayment, page.isAuto);

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
