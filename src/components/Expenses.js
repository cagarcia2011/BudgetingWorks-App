import React from 'react'

import ExpenseCard from './ExpenseCard'

import { gridStyle } from '../styles/styles'

function Expenses({expenses, budgetMonthYear, type, handleRefresh}) {
  return (
    <div style={gridStyle}>
        {expenses.map((expense, index) => (
            <ExpenseCard 
                key={expense.id} 
                expense={expense} 
                index={index} 
                budgetMonthYear={budgetMonthYear}
                type={type}
                handleRefresh={handleRefresh}
                />
        ))}
    </div>
  )
}

export default Expenses