import express from "express";
import TrodatRegister from "../models/TrodatRegister.js";
import CashRegister from "../models/CashRegister.js";

const router = express.Router();

const trodatStatistic = async () => {
  const registers = await TrodatRegister.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
        trodatSells: { $sum: "$trodatSells" },
        total: { $sum: "$total" },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 2 },
  ]);

  let trodatSells = {};
  let total = {};

  if (registers.length === 1) {
    const current = registers[0];

    trodatSells = {
      current: current.trodatSells,
      isUp: true,
    };

    total = {
      current: current.total,
      isUp: true,
    };
  } else if (registers.length === 2) {
    const [current, last] = registers;

    trodatSells = {
      current: current.trodatSells,
      isUp: current.trodatSells >= last.trodatSells,
    };

    total = {
      current: current.total,
      isUp: current.total >= last.total,
    };
  } else {
    trodatSells = { current: 0, isUp: false };
    total = { current: 0, isUp: false };
  }

  return { trodatSells, total };
};

const cashStatistic = async () => {
  // Step 1: Get daily totals for last 2 days
  const dailyRegisters = await CashRegister.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: { $sum: "$total" },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 2 },
  ]);

  // Step 2: Get total for current month
  const now = new Date();
  const year = now.getFullYear();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const monthlyRegisters = await CashRegister.aggregate([
    {
      $match: {
        date: { $gte: firstDayOfMonth, $lt: nextMonth },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$total" },
      },
    },
  ]);

  const monthlyData = await CashRegister.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$total" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const monthTotals = Array(12).fill(0);
  let lastMonthWithData = 0;

  monthlyData.forEach((entry) => {
    const monthIndex = entry._id - 1; // _id from $month is 1-12
    monthTotals[monthIndex] = entry.total;
    lastMonthWithData = Math.max(lastMonthWithData, monthIndex);
  });

  const monthlySeries = monthTotals.slice(0, lastMonthWithData + 1);

  // Calculate isUp based on daily comparison
  let isUp = false;
  if (dailyRegisters.length === 1) {
    isUp = true;
  } else if (dailyRegisters.length === 2) {
    isUp = dailyRegisters[0].total >= dailyRegisters[1].total;
  }

  const monthlyTotal =
    monthlyRegisters.length > 0 ? monthlyRegisters[0].total : 0;

  return {
    total: monthlyTotal,
    isUp,
    monthlySeries
  };
};

router.get("/", async (req, res) => {
  try {
    const trodat = await trodatStatistic();
    const cashRegister = await cashStatistic();
    res.status(200).json({ trodat, cashRegister });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching statistics." });
  }
});

export default router;
