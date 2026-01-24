import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className="text-sm">{content}</p>
        <div className="flex justify-end mt-6">

            <button className="text-sm bg-red-400 hover:bg-red-500 px-3 py-2 rounded-md" onClick={onDelete}>Delete</button>
        </div>
      
    </div>
  )
}

export default DeleteAlert
