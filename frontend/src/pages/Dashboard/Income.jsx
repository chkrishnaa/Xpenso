import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Modals/Overview/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Transaction from '../../components/Modals/TransactionModals/Transaction'
import AddIncomeForm from '../../components/Modals/Forms/AddIncomeForm'
import { useUserAuth } from '../../hooks/useUserAuth'
import { toast } from 'react-hot-toast'
import IncomeList from '../../components/Cards/IncomeList'
import DeleteAlert from '../../components/Modals/Alerts/DeleteAlert'

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] =useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert]=useState({
    show:false,
    data:null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.GET_ALL_INCOMES
      );

      if (response.data?.incomes) {
        setIncomeData(response.data.incomes);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };


  const handleAddIncome = async(income) =>{
    const {source, amount, date, icon} = income;

    if(!source.trim()){
      toast.error("Source is required.");
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

    if(!date){
      toast.error("Date is required.");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income Added Successfully");
      fetchIncomeDetails();

    } catch(error){
      console.error("Error adding income. Please try again.", error.response?.data?.message || error.message);
    }
  }

  const deleteIncome = async(id) =>{
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenAddIncomeModal({show:false, data:null});
      toast.success("Income Deleted Successfully");
      setOpenDeleteAlert({ show: false, data: null });
      setOpenAddIncomeModal(false);
      fetchIncomeDetails();
    } catch(error){
      console.error("Error deleting income. Please try again.", error.response?.data?.message || error.message);
    }
  }

  const deleteAllIncome = async() =>{
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_ALL_INCOMES);
      setOpenAddIncomeModal({show:false, data:null});
      toast.success("All Incomes Deleted Successfully");
      setOpenDeleteAlert({ show: false, data: null });
      setOpenAddIncomeModal(false);
      fetchIncomeDetails();
    } catch(error){
      console.error("Error deleting all incomes. Please try again.", error.response?.data?.message || error.message);
    }
  }

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.EXPORT_INCOME,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Error downloading income details. Please try again.",
        error
      );
      toast.error("Failed to download income details. Please try again.");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {
      
    }
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-0 sm:my-5 mx-auto">
        <div className="grid grid-col-1 gap-0 sm:gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncomeData={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
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
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Transaction
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Transaction>

        <Transaction
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({ show: false, data: null, type: null })
          }
          title={
            openDeleteAlert.type === "all"
              ? "Delete All Incomes"
              : "Delete Income"
          }
        >
          <DeleteAlert
            content={
              openDeleteAlert.type === "all"
                ? "Are you sure you want to delete all your incomes? This action cannot be undone."
                : "Are you sure you want to delete this income?"
            }
            onDelete={() => {
              if (openDeleteAlert.type === "all") {
                deleteAllIncome();
              } else {
                deleteIncome(openDeleteAlert.data);
              }

              setOpenDeleteAlert({ show: false, data: null, type: null });
            }}
          />
        </Transaction>
      </div>
    </DashboardLayout>
  );
}

export default Income
