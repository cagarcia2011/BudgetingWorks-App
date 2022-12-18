import React from 'react'

import BudgetCard from './BudgetCard'

import { gridStyle } from '../../styles/styles'

function Budgets({budgets}) {
  return (
    <div style={gridStyle}>
        {budgets.map((budget, index) => (
        <BudgetCard key={budget.id} budget={budget} index={index}/>
        ))}
    </div>
  )
}

export default Budgets