import React from 'react'

import IncomeCard from './IncomeCard'

import { gridStyle } from '../../styles/styles'

const Incomes = ({incomes, budgetMonthYear, handleRefresh}) => {
  return (
    <div style={gridStyle}>
        {incomes.map((income, index) => (
            <IncomeCard
                key={income.id}
                income={income}
                index={index}
                budgetMonthYear={budgetMonthYear}
                handleRefresh={handleRefresh}
                />
        ))}
    </div>
  )
}

export default Incomes