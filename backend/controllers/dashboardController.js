const Income = require("../models/Income");
const Expense = require("../models/Expense");

const {Types} = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
        const last30DaysDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const MIN_TRANSACTIONS_FOR_WINDOW = 15;

        const [totalIncomeAgg, totalExpenseAgg, incomesAll, expensesAll, incomesLast30, expensesLast30] =
          await Promise.all([
            Income.aggregate([
              { $match: { userId: userObjectId } },
              { $group: { _id: null, total: { $sum: "$amount" } } },
            ]),
            Expense.aggregate([
              { $match: { userId: userObjectId } },
              { $group: { _id: null, total: { $sum: "$amount" } } },
            ]),
            Income.find({ userId }).sort({ date: -1, createdAt: -1 }),
            Expense.find({ userId }).sort({ date: -1, createdAt: -1 }),
            Income.find({ userId, createdAt: { $gte: last30DaysDate } }).sort({
              date: -1,
              createdAt: -1,
            }),
            Expense.find({ userId, createdAt: { $gte: last30DaysDate } }).sort({
              date: -1,
              createdAt: -1,
            }),
          ]);

        const mapIncome = (doc) => ({ ...doc.toObject(), type: "income" });
        const mapExpense = (doc) => ({ ...doc.toObject(), type: "expense" });
        const sortByNewest = (a, b) =>
          new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);

        const combinedLast30 = [
          ...incomesLast30.map(mapIncome),
          ...expensesLast30.map(mapExpense),
        ].sort(sortByNewest);

        const combinedAll = [...incomesAll.map(mapIncome), ...expensesAll.map(mapExpense)].sort(
          sortByNewest
        );

        const useLast30Mode = combinedLast30.length >= MIN_TRANSACTIONS_FOR_WINDOW;
        const activeMode = useLast30Mode ? "last30days" : "last15transactions";
        const effectiveCombined = useLast30Mode
          ? combinedLast30
          : combinedAll.slice(0, MIN_TRANSACTIONS_FOR_WINDOW);

        const effectiveIncomeTransactions = effectiveCombined.filter(
          (t) => t.type === "income"
        );
        const effectiveExpenseTransactions = effectiveCombined.filter(
          (t) => t.type === "expense"
        );

        const incomeWindowTotal = effectiveIncomeTransactions.reduce(
          (total, transaction) => total + Math.abs(Number(transaction.amount || 0)),
          0
        );

        const expenseWindowTotal = effectiveExpenseTransactions.reduce(
          (total, transaction) => total + Math.abs(Number(transaction.amount || 0)),
          0
        );

        const lastTransactions = combinedAll.slice(0, 5);

        const income = Math.abs(Number(totalIncomeAgg[0]?.total || 0));
        const expense = Math.abs(Number(totalExpenseAgg[0]?.total || 0));

        const incomeDateList = effectiveIncomeTransactions.map((t) => new Date(t.date));
        const expenseDateList = effectiveExpenseTransactions.map((t) => new Date(t.date));
        const incomeDateRange = incomeDateList.length
          ? {
              from: new Date(Math.min(...incomeDateList)).toISOString(),
              to: new Date(Math.max(...incomeDateList)).toISOString(),
            }
          : { from: null, to: null };
        const expenseDateRange = expenseDateList.length
          ? {
              from: new Date(Math.min(...expenseDateList)).toISOString(),
              to: new Date(Math.max(...expenseDateList)).toISOString(),
            }
          : { from: null, to: null };

        res.status(200).json({
          success: true,
          totalIncome: income,
          totalExpense: expense,
          totalBalance: income - expense,
          last30DaysExpenses: {
            total: expenseWindowTotal,
            transactions: effectiveExpenseTransactions,
            mode: activeMode,
            dateRange: expenseDateRange,
          },
          last30DaysIncomes: {
            total: incomeWindowTotal,
            transactions: effectiveIncomeTransactions,
            mode: activeMode,
            dateRange: incomeDateRange,
          },
          recentTransactions: lastTransactions,
        });


    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
}
