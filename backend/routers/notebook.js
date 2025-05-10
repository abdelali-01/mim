import express from "express";
import Notebook from "../models/Notebook.js"; // Adjust the path as needed
import { rolePermissions } from "../utils/middlewares/adminPermissions.js";

const router = express.Router();

// Create a new notebook
router.post("/", rolePermissions(['super' , 'sub-super']) ,async (req, res) => {
  try {
    const notebook = new Notebook(req.body);
    const savedNotebook = await notebook.save();
    res.status(201).json(savedNotebook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all notebooks
router.get("/", rolePermissions(['super' , 'sub-super']) ,async (req, res) => {
  try {
    const notebooks = await Notebook.find();
    res.status(200).json(notebooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single notebook by ID
router.get("/:id", rolePermissions(['super' , 'sub-super']) ,async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.id);
    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }
    res.status(200).json(notebook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a notebook by ID or add an item to the table
router.put("/:id", rolePermissions(['super' , 'sub-super']) , async (req, res) => {
 try {
    const { table } = req.body;

    if (!Array.isArray(table) || table.length === 0) {
      return res.status(400).json({ message: "Table data is required and must be a non-empty array." });
    }

    const updatedNotebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      { table },
      { new: true, runValidators: true }
    );

    if (!updatedNotebook) {
      return res.status(404).json({ message: "Notebook not found." });
    }

    res.status(200).json(updatedNotebook);
  } catch (error) {
    console.error("Error updating notebook:", error);
    res.status(500).json({ message: "Server error while updating notebook." });
  }
});


// Delete a notebook by ID
router.delete("/:id", rolePermissions(['super']) ,async (req, res) => {
  try {
    const deletedNotebook = await Notebook.findByIdAndDelete(req.params.id);
    if (!deletedNotebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }
    res.status(200).json({ message: "Notebook deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;



/**
 * API Endpoints:
 * 
 * 1. Create a new notebook
 *    Method: POST
 *    Endpoint: /
 *    Request Body:
 *    {
 *      "client": {
 *        "username": "client_username",
 *        "id": "client_id"
 *      },
 *      "table": [
 *        {
 *          "product": "product_name",
 *          "quantity": 2,
 *          "price": 100,
 *          "paid": false
 *        }
 *      ],
 *      "prePayment": 50
 *    }
 * 
 * 2. Get all notebooks
 *    Method: GET
 *    Endpoint: /
 * 
 * 3. Get a single notebook by ID
 *    Method: GET
 *    Endpoint: /:id
 * 
 * 4. Update a notebook by ID or add an item to the table
 *    Method: PUT
 *    Endpoint: /:id
 *    Request Body (General Update):
 *    {
 *      "client": {
 *        "username": "new_client_username",
 *        "id": "new_client_id"
 *      },
 *      "prePayment": 100
 *    }
 *    Request Body (Add Item to Table):
 *    {
 *      "tableItem": {
 *        "product": "new_product_name",
 *        "quantity": 1,
 *        "price": 50,
 *        "paid": true
 *      }
 *    }
 * 
 * 5. Delete an item from the table
 *    Method: PATCH
 *    Endpoint: /:id?method=remove
 *    Request Body:
 *    {
 *      "itemId": "id_of_item_to_remove"
 *    }
 * 
 * 6. Update an item in the table
 *    Method: PATCH
 *    Endpoint: /:id
 *    Request Body:
 *    {
 *      "itemId": "id_of_item_to_update",
 *      "product": "updated_product_name",
 *      "quantity": 3,
 *      "price": 150,
 *      "paid": true
 *    }
 * 
 * 7. Delete a notebook by ID
 *    Method: DELETE
 *    Endpoint: /:id
 */