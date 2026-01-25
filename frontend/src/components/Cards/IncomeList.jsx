import React from 'react'
import { LuDownload, LuTrash2 } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({...props}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <div className="flex space-x-2">
          <button
            className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
            onClick={props.onDownload}
          >
            <LuDownload className="text-sm" />
          </button>

          <button
            className="flex items-center gap-2 text-sm bg-red-400 hover:bg-red-500 px-3 py-2 rounded-md"
            onClick={props.onDeleteAll}
          >
            <LuTrash2 className="text-sm" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {[...props.transactions]
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              amount={income.amount}
              date={moment(income.date).format("Do MM YYYY")}
              type="income"
              onDelete={() => props.onDelete(income._id)}
            />
          ))}
      </div>
    </div>
  );
}

export default IncomeList
