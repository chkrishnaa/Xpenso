const Expense = require("../models/Expense");
const XLSX = require("xlsx");

exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { icon, category, amount, date } = req.body;

    if (!category || amount == null) {
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

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount: -Math.abs(amountNumber), // ✅ always negative
      date: date? new Date(date) : undefined,
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId }).sort({ date: -1 }).lean();

    const formattedExpenses = expenses.map((item) => ({
      ...item,
      type: "expense",
    }));

    res.status(200).json({
      success: true,
      expenses: formattedExpenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    await Expense.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "All expenses deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting all expenses: " + error.message,
    });
  }
};


exports.exportExpenseDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0],
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
        XLSX.writeFile(workbook, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};