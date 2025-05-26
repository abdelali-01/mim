import mongoose from "mongoose";

const CalendarItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"]
    },
    endDate: {
        type: Date,
    },
    level: {
        type: String,
        enum: ['danger', 'success', 'primary', 'warning'],
        default: 'primary'
    },
}, {
    timestamps: true
});

const CalendarItem = mongoose.model('CalendarItem', CalendarItemSchema);
export default CalendarItem;