import express from "express";
import Notebook from "../models/Notebook.js"; // Adjust the path as needed

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
    // Check if the request is to add an item to the table
    if (req.body.tableItem) {
      const updatedNotebook = await Notebook.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { table: req.body.tableItem } }, // Add the new item to the table array
        { new: true, runValidators: true } // Return the updated document and validate the new item
      );
      if (!updatedNotebook) {
        return res.status(404).json({ error: "Notebook not found" });
      }
      return res.status(200).json(updatedNotebook);
    }

    // Otherwise, perform a general update
    const updatedNotebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update the provided fields
      { new: true, runValidators: true } // Return the updated document and validate the changes
    );
    if (!updatedNotebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }
    res.status(200).json(updatedNotebook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete an item from the table
// PATCH / :id?method=remove
router.patch("/:id", rolePermissions(['super']) , async (req, res) => {
  // Check if the request is to remove an item from the table
  const { method } = req.query;
  try {
    if (method === "remove") {
      const updatedNotebook = await Notebook.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { table: { _id: req.body.itemId } } }, // Remove the item with the specified ID from the table array
        { new: true, runValidators: true } // Return the updated document and validate the changes
      );
      if (!updatedNotebook) {
        return res.status(404).json({ error: "Notebook not found" });
      }
      return res.status(200).json(updatedNotebook);
    }

    // find the notebook by ID and update the table item
    const notebook = await Notebook.findById(req.params.id);
    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    // find the existing item in the table array
    const item = notebook.table.id(req.body.itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in the table" });
    }

    // merge the existing item with the new data
    Object.assign(item, req.body);
    // save the updated notebook
    const updatedNotebook = await notebook.save();
    res.status(200).json(updatedNotebook);
  } catch (error) {
    res.status(400).json({ error: error.message });
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