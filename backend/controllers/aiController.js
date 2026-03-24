const { GoogleGenerativeAI } = require("@google/generative-ai");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Initialize Gemini once (good practice)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * POST /api/v1/ai/chat
 */
exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const userObjectId = new Types.ObjectId(String(userId));
    const last30DaysDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [incomeAgg, expenseAgg, income30Agg, expense30Agg] = await Promise.all([
      Income.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Income.aggregate([
        { $match: { userId: userObjectId, date: { $gte: last30DaysDate } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { userId: userObjectId, date: { $gte: last30DaysDate } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    const [recentIncomes, recentExpenses, expenseByCategory, incomeBySource] =
      await Promise.all([
        Income.find({ userId })
          .sort({ date: -1, createdAt: -1 })
          .limit(10)
          .select("source amount date"),
        Expense.find({ userId })
          .sort({ date: -1, createdAt: -1 })
          .limit(10)
          .select("category amount date"),
        Expense.aggregate([
          { $match: { userId: userObjectId } },
          { $group: { _id: "$category", total: { $sum: "$amount" } } },
          { $sort: { total: -1 } },
          { $limit: 7 },
        ]),
        Income.aggregate([
          { $match: { userId: userObjectId } },
          { $group: { _id: "$source", total: { $sum: "$amount" } } },
          { $sort: { total: -1 } },
          { $limit: 7 },
        ]),
      ]);

    const totalIncome = incomeAgg[0]?.total || 0;
    const totalExpense = expenseAgg[0]?.total || 0;
    const last30Income = income30Agg[0]?.total || 0;
    const last30Expense = expense30Agg[0]?.total || 0;
    const totalBalance = totalIncome - totalExpense;

    const financeContext = {
      totalIncome,
      totalExpense,
      totalBalance,
      last30Days: {
        income: last30Income,
        expense: last30Expense,
        net: last30Income - last30Expense,
      },
      topExpenseCategories: expenseByCategory.map((item) => ({
        category: item._id || "Uncategorized",
        total: item.total,
      })),
      topIncomeSources: incomeBySource.map((item) => ({
        source: item._id || "Other",
        total: item.total,
      })),
      recentIncomes: recentIncomes.map((i) => ({
        source: i.source,
        amount: i.amount,
        date: i.date,
      })),
      recentExpenses: recentExpenses.map((e) => ({
        category: e.category,
        amount: e.amount,
        date: e.date,
      })),
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
You are an expert personal finance assistant for this user's expense tracker app.
Use only the provided JSON data as source of truth for user-specific numbers.
If user asks for suggestions, give practical money-management steps in simple language.
If data is insufficient for a precise answer, say what is missing and still provide best-effort guidance.
Keep responses concise and useful.

User financial data (JSON):
${JSON.stringify(financeContext, null, 2)}

User question:
${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return res.status(500).json({ error: "Gemini API failed" });
  }
};
