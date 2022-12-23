import { useState } from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';

import { useAuthUser } from './contexts/UserContext';
import { useBudgets } from './contexts/BudgetsContext';
import { useExpenses } from './contexts/ExpensesContext';
import { useIncomes } from './contexts/IncomesContext';

import NavBar from './NavBar';
import Budget from './budgets/Budget';
import Budgets from './budgets/Budgets';
import AddBudgetModal from './budgets/AddBudgetModal';
import AddExpenseModal from './expenses/AddExpenseModal';
import AddIncomeModal from './incomes/AddIncomeModal';

const Dashboard = () => {
  const {userId, logout} = useAuthUser();
  const {budgets, refreshBudgets} = useBudgets();
  const { refreshExpenses } = useExpenses();
  const { refreshIncomes } = useIncomes();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(false)

  const navigate = useNavigate()
  
  async function handleRefresh(e) {
    refreshIncomes();
    refreshExpenses();
    refreshBudgets();
  }
  
  function handleLogout(e) {
    logout()
    navigate('/')
  }

  return (
    <>
      <NavBar 
        expandedMenu={expandedMenu}
        handleCollapse={() => setExpandedMenu(false)}
        handleExpand={() => setExpandedMenu(true)}
        handleRefresh={handleRefresh} 
        handleLogout={handleLogout} 
        setShowAddBudgetModal={setShowAddBudgetModal}
        setShowAddIncomeModal={setShowAddIncomeModal}
        setShowAddExpenseModal={setShowAddExpenseModal}
        />
      {budgets.length ? 
      <Container className='my-4'>
        <Routes>
          <Route element={<Budgets budgets={budgets} />} path='/' exact />
          <Route element={<Budget handleRefresh={handleRefresh}/>} path='/budget/:index' exact />
        </Routes>
      </Container> :
      <Container className='my-4'>
        <Button 
          variant="primary" 
          className='w-100' 
          onClick={()=> setShowAddBudgetModal(true)} 
          >
          Add New Budget
        </Button>
      </Container>
      }
      <AddBudgetModal 
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
        userId={userId}/>
      
      <AddExpenseModal 
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        />
      <AddIncomeModal
        show={showAddIncomeModal}
        handleClose={() => setShowAddIncomeModal(false)}
        /> 
    </>
  )
}

export default Dashboard
