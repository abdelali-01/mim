import express from 'express';
import CashRegister from '../models/CashRegister.js';
import { rolePermissions } from '../utils/middlewares/adminPermissions.js';

const router = express.Router();


router.get('/' , rolePermissions(['super' , 'sub-super']) ,async (req , res) => {
    try {
        const result = await CashRegister.find();
        if(!result){
            res.status(404).json({message : 'Cash register pages not found  !'});
        }

        res.status(200).json({
            message : 'success',
            pages : result
        })
    } catch (error) {
        console.log('error getting items', error);
        res.status(400).json({message : error.message});
    }
})

router.post('/', rolePermissions(['super' , 'sub-super']) , async (req, res) => {
  try {
    const newPage = new CashRegister(); // no totals here; hook will handle
    const saved = await newPage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT: Update by adding/removing items or removed entries
router.put('/:id', rolePermissions(['super' , 'sub-super']) ,async (req, res) => {
  try {
    const { addItem, addRemoved, deleteItemId, deleteRemovedId } = req.body;

    const page = await CashRegister.findById(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });

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
      page.items = page.items.filter((item) => item._id.toString() !== deleteItemId);
    }

    // Delete removed by _id
    if (deleteRemovedId) {
      page.removed = page.removed.filter((r) => r._id.toString() !== deleteRemovedId);
    }

    const updated = await page.save(); // recalculates totals automatically
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
