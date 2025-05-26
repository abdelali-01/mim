import express from 'express';
import CalendarItem from '../models/CalendarItems.js';

const router = express.Router();

// Get all calendar items
router.get('/',  async (req, res) => {
    try {
        const calendarItems = await CalendarItem.find();
        res.json(calendarItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new calendar item
router.post('/', async (req, res) => {
    try {
        const { title, startDate, endDate, level } = req.body;
        const calendarItem = new CalendarItem({
            title,
            startDate,
            endDate,
            level,
        });
        const savedItem = await calendarItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a calendar item
router.put('/:id',  async (req, res) => {
    try {
        const { title, startDate, endDate, level } = req.body;
        const calendarItem = await CalendarItem.findOneAndUpdate(
            { _id: req.params.id },
            { title, startDate, endDate, level },
            { new: true }
        );
        if (!calendarItem) {
            return res.status(404).json({ message: 'Calendar item not found' });
        }
        res.json(calendarItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a calendar item
router.delete('/:id',async (req, res) => {
    try {
        const calendarItem = await CalendarItem.findOneAndDelete({
            _id: req.params.id,
        });
        if (!calendarItem) {
            return res.status(404).json({ message: 'Calendar item not found' });
        }
        res.json({ message: 'Calendar item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
