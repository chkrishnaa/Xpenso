import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import { addThousandsSeperator } from '../../utils/helper';
import CumulativeIncomeExpenseChart from '../../components/Charts/CumulativeIncomeExpenseChart';
import RecentTransactions from '../../components/Modals/TransactionModals/RecentTransactions';
import FinancialOverview from '../../components/Modals/Overview/FinancialOverview';
import ExpenseTransactions from '../../components/Modals/TransactionModals/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Modals/TransactionModals/Last30DaysExpenses';
import IncomeTransactions from '../../components/Modals/TransactionModals/IncomeTransactions';
import Last30DaysIncomes from '../../components/Modals/TransactionModals/Last30DaysIncomes';

const Dashboard = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDataboardData = async () =>{
    if(loading) return;

    setLoading(true);

    try{
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

        if(response.data){
            setDashboardData(response.data);
        }
    } catch(error){
        console.log("Something went wrong. Please try again.", error);
    }
    finally {
      setLoading(false);
    }
    
  }

  useEffect(() => {
    fetchDataboardData();
    return () => {};
  }, []);

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
          <CumulativeIncomeExpenseChart
            transactions={[
              ...(dashboardData?.last30DaysIncomes?.transactions || []).map(
                (t) => ({
                  ...t,
                  amount: t.amount, // positive
                  type: "income",
                  labelName: t.source, // ✅ NORMALIZED
                })
              ),
              ...(dashboardData?.last30DaysExpenses?.transactions || []).map(
                (t) => ({
                  ...t,
                  amount: -Math.abs(t.amount), // negative
                  type: "expense",
                  labelName: t.category, // ✅ NORMALIZED
                })
              ),
            ]}
          />
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
            data={dashboardData?.last30DaysIncomes?.transactions || []}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard
