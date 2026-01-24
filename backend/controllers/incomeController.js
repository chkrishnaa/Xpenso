const User = require("../models/User");
const Income = require("../models/Income");
const XLSX = require("xlsx");

exports.addIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { icon, source, amount, date } = req.body;

    if (!source || amount == null) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const amountNumber = Number(amount);
    if (isNaN(amountNumber)) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a number",
      });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount: Math.abs(amountNumber), // ✅ always positive
      date: date? new Date(date) : undefined,
    });

    await newIncome.save();

    res.status(201).json({
      success: true,
      message: "Income added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await Income.find({ userId }).sort({ date: -1 }).lean();

    const formattedIncomes = incomes.map((item) => ({
      ...item,
      type: "income",
    }));

    res.status(200).json({
      success: true,
      incomes: formattedIncomes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Income deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting income: " + error.message,
        });
    }
};

exports.deleteAllIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    await Income.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "All incomes deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting all incomes: " + error.message,
    });
  }
};


exports.exportIncomeDetails = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
    XLSX.writeFile(workbook, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error downloading income details: " + error.message,
    });
  }
};
