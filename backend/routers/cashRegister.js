import express from "express";
import CashRegister from "../models/CashRegister.js";
import { rolePermissions } from "../utils/middlewares/adminPermissions.js";

const router = express.Router();

router.get("/", rolePermissions(["super", "sub-super"]), async (req, res) => {
  try {
    const result = await CashRegister.find();
    if (!result) {
      res.status(404).json({ message: "Cash register pages not found  !" });
    }

    const registers = await CashRegister.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          t_total: { $sum: "$t_total" },
          f_total: { $sum: "$f_total" },
          total: { $sum: "$total" },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.status(200).json({
      message: "success",
      pages: result,
      registers,
    });
  } catch (error) {
    console.log("error getting items", error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/", rolePermissions(["super", "sub-super"]), async (req, res) => {
  try {
    const { date } = req.body;
    const newPage = new CashRegister();
    
    if (date) {
      // Create date at noon to avoid timezone issues
      const inputDate = new Date(date);
      inputDate.setHours(12, 0, 0, 0);
      newPage.date = inputDate;
    }
    
    const saved = await newPage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update by adding/removing items or removed entries
router.put(
  "/:id",
  rolePermissions(["super", "sub-super"]),
  async (req, res) => {
    try {
      const {
        addItem,
        addRemoved,
        deleteItemId,
        deleteRemovedId,
        updateItem,
        updateRemoved,
      } = req.body;

      const page = await CashRegister.findById(req.params.id);
      if (!page) return res.status(404).json({ message: "Page not found" });

      // Add item
      if (addItem) {
        page.items.push(addItem);
      }

      // Add removed
      if (addRemoved) {
        page.removed.push(addRemoved);
      }

      // Delete item by _id
      if (deleteItemId) {
        page.items = page.items.filter(
          (item) => item._id.toString() !== deleteItemId
        );
      }

      // Delete removed by _id
      if (deleteRemovedId) {
        page.removed = page.removed.filter(
          (r) => r._id.toString() !== deleteRemovedId
        );
      }

      // Update item
      if (updateItem && updateItem._id) {
        const itemToUpdate = page.items.id(updateItem._id);
        if (itemToUpdate) {
          const { _id, ...rest } = updateItem;
          Object.assign(itemToUpdate, rest);
        } else {
          console.warn("Item not found for update:", updateItem._id);
        }
      }

      // Update removed
      if (updateRemoved && updateRemoved._id) {
        const removedToUpdate = page.removed.id(updateRemoved._id);
        if (removedToUpdate) {
          const { _id, ...rest } = updateRemoved;
          Object.assign(removedToUpdate, rest);
        } else {
          console.warn("Item not found for update:", updateItem._id);
        }
      }

      const updated = await page.save(); // recalculates totals automatically
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// delete cash register page 
router.delete('/:id' , rolePermissions(['super' , 'sub-super']) ,async (req ,res) => {
    try {
        const deletedPage = await CashRegister.findByIdAndDelete(req.params.id);
        if(!deletedPage){
            return res.status(404).send({message : 'The page you select doesn`t exist !'})
        }

        res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ message: err.message });
    }
});

export default router;
