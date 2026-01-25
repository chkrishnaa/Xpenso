const Income = require("../models/Income");
const Expense = require("../models/Expense");

const {Types} = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const last30DaysImcomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomesLast30Days = last30DaysImcomeTransactions.reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

        const incomes = await Income.find({ userId })
          .sort({ createdAt: -1 });

        const expenses = await Expense.find({ userId })
          .sort({ createdAt: -1 });

        const lastTransactions = [
          ...incomes.map((t) => ({ ...t.toObject(), type: "income" })),
          ...expenses.map((t) => ({ ...t.toObject(), type: "expense" })),
        ]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);



        const income = totalIncome[0]?.total || 0; // +ve
        const expense = totalExpense[0]?.total || 0; // -ve

        

        res.status(200).json({
          success: true,

          totalIncome: income,
          totalExpense: expense,
          totalBalance: income + expense, // ✅ CORRECT

          last30DaysExpenses: {
            total: expensesLast30Days,
            transactions: last30DaysExpenseTransactions,
          },
          last30DaysIncomes: {
            total: incomesLast30Days,
            transactions: last30DaysImcomeTransactions,
          },
          recentTransactions: lastTransactions,
        });


    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
}
