import React from 'react'

import ExpenseCard from './ExpenseCard'

import { gridStyle } from '../../styles/styles'

const Expenses = ({expenses, budgetMonthYear, handleRefresh}) => {
  return (
    <div style={gridStyle}>
        {expenses.map((expense, index) => (
            <ExpenseCard 
                key={expense.id} 
                expense={expense} 
                index={index} 
                budgetMonthYear={budgetMonthYear}
                handleRefresh={handleRefresh}
                />
        ))}
    </div>
  )
}

export default Expenses