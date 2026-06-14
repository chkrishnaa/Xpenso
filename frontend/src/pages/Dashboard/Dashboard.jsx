import React, { useEffect, useState, useMemo } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeperator } from "../../utils/helper";
import { useTheme } from "../../context/ThemeContext";
import CumulativeIncomeExpenseChart from "../../components/Charts/CumulativeIncomeExpenseChart";
import RecentTransactions from "../../components/Modals/TransactionModals/RecentTransactions";
import FinancialOverview from "../../components/Modals/Overview/FinancialOverview";
import ExpenseTransactions from "../../components/Modals/TransactionModals/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Modals/TransactionModals/Last30DaysExpenses";
import IncomeTransactions from "../../components/Modals/TransactionModals/IncomeTransactions";
import Last30DaysIncomes from "../../components/Modals/TransactionModals/Last30DaysIncomes";

const Dashboard = () => {
  const { darkMode } = useTheme();
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [allIncomes, setAllIncomes] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  // month in YYYY-MM (input type=month value)
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}`;
  });
  const [minMonth, setMinMonth] = useState(null);
  const [maxMonth, setMaxMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}`;
  });

  const incomeMode = dashboardData?.last30DaysIncomes?.mode || "last30days";
  const expenseMode = dashboardData?.last30DaysExpenses?.mode || "last30days";
  const isFallbackMode =
    incomeMode === "last15transactions" || expenseMode === "last15transactions";
  const chartTitle = isFallbackMode
    ? "Income vs Expense (Latest 15 Transactions)"
    : "Income vs Expense (Last 30 Days)";
  const incomeTitle =
    incomeMode === "last15transactions"
      ? "Latest 15 Income Transactions"
      : "Last 30 Days Incomes";
  const expenseTitle =
    expenseMode === "last15transactions"
      ? "Latest 15 Expense Transactions"
      : "Last 30 Days Expenses";

  const fetchDataboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const [dashboardResp, incomesResp, expensesResp] = await Promise.all([
        axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA),
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOMES),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSES),
      ]);

      if (dashboardResp?.data) {
        setDashboardData(dashboardResp.data);
      }

      const incomes = incomesResp?.data?.incomes || [];
      const expenses = expensesResp?.data?.expenses || [];

      setAllIncomes(incomes);
      setAllExpenses(expenses);

      const combined = [
        ...incomes.map((t) => ({
          ...t,
          type: "income",
          amount: Number(t.amount),
        })),
        ...expenses.map((t) => ({
          ...t,
          type: "expense",
          amount: Number(t.amount),
        })),
      ].sort(
        (a, b) =>
          new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
      );

      setAllTransactions(combined);

      // compute earliest month available for user
      if (combined.length) {
        const earliestRaw =
          combined[combined.length - 1].date ||
          combined[combined.length - 1].createdAt;
        const earliest = new Date(earliestRaw);
        const min = `${earliest.getFullYear()}-${String(
          earliest.getMonth() + 1,
        ).padStart(2, "0")}`;
        setMinMonth(min);
        // ensure selectedMonth not earlier than min
        setSelectedMonth((cur) => (min && cur < min ? min : cur));
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataboardData();
    return () => {};
  }, []);

  // derive monthly filtered data based on `selectedMonth`
  const monthlyTransactions = useMemo(() => {
    if (!selectedMonth || !allTransactions.length) return [];
    const [y, m] = selectedMonth.split("-").map(Number);
    return allTransactions.filter((t) => {
      const d = new Date(t.date || t.createdAt);
      return d.getFullYear() === y && d.getMonth() + 1 === m;
    });
  }, [allTransactions, selectedMonth]);

  const monthlyIncomes = useMemo(
    () => monthlyTransactions.filter((t) => t.type === "income"),
    [monthlyTransactions],
  );

  const monthlyExpenses = useMemo(
    () => monthlyTransactions.filter((t) => t.type === "expense"),
    [monthlyTransactions],
  );

  const monthlyIncomeTotal = useMemo(
    () =>
      monthlyIncomes.reduce((s, it) => s + Math.abs(Number(it.amount || 0)), 0),
    [monthlyIncomes],
  );

  const monthlyExpenseTotal = useMemo(
    () =>
      monthlyExpenses.reduce(
        (s, it) => s + Math.abs(Number(it.amount || 0)),
        0,
      ),
    [monthlyExpenses],
  );

  const monthlyBalance = monthlyIncomeTotal - monthlyExpenseTotal;

  const monthLabel = useMemo(() => {
    if (!selectedMonth) return "";
    const [y, m] = selectedMonth.split("-").map(Number);
    const d = new Date(y, m - 1);
    return d.toLocaleString(undefined, { month: "long", year: "numeric" });
  }, [selectedMonth]);

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="mb-0 mt-5 mob:mb-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mob:gap-5 mx-3 mob:mx-0">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.totalBalance)}
            color="bg-balance"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
            color="bg-income"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
            color="bg-expense"
          />
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src="/LuWalletMinimal.png"
                alt="Xpenso"
                className="w-10 h-10 rounded-md"
              />
              <div>
                <div className="text-lg font-semibold">{`Dashboard — ${monthLabel}`}</div>
                <p className="text-xs text-gray-500">
                  Overview of transactions for the selected month.
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border shadow-sm ${darkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-200"}`}
            >
              <FiCalendar
                className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
              />

              <input
                type="month"
                value={selectedMonth}
                min={minMonth || undefined}
                max={maxMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={`bg-transparent outline-none text-sm font-medium cursor-pointer ${darkMode ? "text-white" : "text-gray-900"}`}
              />
            </div>
          </div>

          {monthlyTransactions.length === 0 ? (
            <div className="px-2 py-6 mob:px-6 rounded-none mob:rounded-xl sm:rounded-2xl border-t border-blue-500 mob:border transition-colors duration-300 bg-linear-to-b shadow-none mob:shadow-lg text-center">
              {/* <div className="text-sm text-gray-600">
                No transactions have been recorded for {monthLabel}.
              </div> */}

              <div
                className={`flex flex-col items-center justify-center gap-3 h-[180px] rounded-2xl border shadow-sm transition-all bg-gradient-to-b ${
                  darkMode
                    ? "from-gray-950 via-gray-950 to-gray-900 border-gray-700 text-white"
                    : "from-blue-50 via-blue-50 to-blue-100 border-blue-300 text-gray-900"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-xl ${
                    darkMode
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-blue-50 text-blue-500"
                  }`}
                >
                  <LuWalletMinimal size={28} />
                </div>

                <h3
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  No Transactions Yet
                </h3>

                <p
                  className={`text-sm text-center max-w-md ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No transactions were recorded for {monthLabel}. Add income or
                  expenses to unlock charts and insights.
                </p>
              </div>
            </div>
          ) : (
            <CumulativeIncomeExpenseChart
              title={`${chartTitle} — ${monthLabel}`}
              transactions={monthlyTransactions.map((t) => ({
                ...t,
                amount:
                  t.type === "income"
                    ? Math.abs(Number(t.amount))
                    : -Math.abs(Number(t.amount)),
                type: t.type,
                labelName: t.type === "income" ? t.source : t.category,
              }))}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mob:gap-5 mt-0 mob:mt-5">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinancialOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <Last30DaysExpenses
            title={expenseTitle}
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <IncomeTransactions
            transactions={dashboardData?.last30DaysIncomes?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />

          <Last30DaysIncomes
            title={incomeTitle}
            data={dashboardData?.last30DaysIncomes?.transactions || []}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
