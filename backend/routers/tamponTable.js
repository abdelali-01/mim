import express from "express";
import TamponTable from "../models/TamponStockTable.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let tamponTable = await TamponTable.findOne();

    // If it doesn't exist, create a new empty one
    if (!tamponTable) {
      tamponTable = new TamponTable({ table: [] });
      await tamponTable.save();
    }

    res.status(200).send(tamponTable);
  } catch (error) {
    console.log("error during getting the tampons table", error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/tampons/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { table } = req.body;

    if (!Array.isArray(table)) {
      return res
        .status(400)
        .json({ message: "Table must be an array of items" });
    }

    const tamponDoc = await TamponTable.findById(id);
    if (!tamponDoc) {
      return res.status(404).json({ message: "TamponTable not found" });
    }

    tamponDoc.table = table;
    // Save the document, triggering pre('save')
    await tamponDoc.save();

    res.status(200).json(tamponDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
