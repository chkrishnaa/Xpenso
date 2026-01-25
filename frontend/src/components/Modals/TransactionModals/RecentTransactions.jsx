import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
        <button
          className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-sm" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {transactions
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0,5).map((transaction) => (
          <TransactionInfoCard
            key={transaction._id}
            title={
              transaction.type === "income"
                ? transaction.source
                : transaction.category
            }
            icon={transaction.icon}
            amount={transaction.amount}
            date={moment(transaction.date).format("Do MMM YYYY")}
            type={transaction.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions
