import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Modals/Overview/ExpenseOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Transaction from "../../components/Modals/TransactionModals/Transaction";
import AddExpenseForm from "../../components/Modals/Forms/AddExpenseForm";
import { useUserAuth } from "../../hooks/useUserAuth";
import { toast } from "react-hot-toast";
import ExpenseList from "../../components/Cards/ExpenseList";
import DeleteAlert from "../../components/Modals/Alerts/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSES
      );

      if (response.data?.expenses) {
        setExpenseData(response.data.expenses);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount) {
      toast.error("Amount is required.");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense Added Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense. Please try again.",
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenAddExpenseModal({ show: false, data: null });
      toast.success("Expense Deleted Successfully");
      setOpenDeleteAlert({ show: false, data: null });
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense. Please try again.",
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteAllExpense = async () => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_ALL_EXPENSES);
      setOpenAddExpenseModal({ show: false, data: null });
      toast.success("All Expenses Deleted Successfully");
      setOpenDeleteAlert({ show: false, data: null });
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting all expenses. Please try again.",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.EXPORT_EXPENSE, 
        {responseType: "blob"}
      );
    
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Error downloading expense details. Please try again.",
        error
      );
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-0 sm:my-5 mx-auto">
        <div className="grid grid-col-1 gap-0 sm:gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpenseData={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDeleteAll={() => {
              setOpenDeleteAlert({
                show: true,
                data: null,
                type: "all",
              });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Transaction
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Transaction>

        <Transaction
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null, type: null })
          }
          title={
            openDeleteAlert.type === "all"
              ? "Delete All Expenses"
              : "Delete Expense"
          }
        >
          <DeleteAlert
            content={
              openDeleteAlert.type === "all"
                ? "Are you sure you want to delete all your expenses? This action cannot be undone."
                : "Are you sure you want to delete this expense?"
            }
            onDelete={() => {
              if (openDeleteAlert.type === "all") {
                deleteAllExpense();
              } else {
                deleteExpense(openDeleteAlert.data);
              }

              setOpenDeleteAlert({ show: false, data: null, type: null });
            }}
          />
        </Transaction>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
