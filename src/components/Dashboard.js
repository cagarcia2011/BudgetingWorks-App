import { useState } from 'react';

import { redirect, Routes, Route, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap';

import { useBudgets } from './contexts/BudgetsContext';
import { useFixedExpenses } from './contexts/FixedExpensesContext';
import { useVariableExpenses } from './contexts/VariableExpensesContext';
import { useAuthUser } from './contexts/UserContext';

import NavBar from './NavBar';
import Budget from './Budget';
import Budgets from './Budgets';
import AddBudgetModal from './AddBudgetModal';
import AddExpenseModal from './AddExpenseModal';
import AddIncomeModal from './AddIncomeModal';

const Dashboard = () => {
  const {user, setUser} = useAuthUser();
  const {budgets, refreshBudgets} = useBudgets();
  const {refreshFixedExpenses} = useFixedExpenses();
  const {refreshVariableExpenses} = useVariableExpenses();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(false)

  const navigate = useNavigate()

  if (user.isLoading) return <h1>Loading...</h1>

  if (!user.isAuthorized) return redirect('/')

  function handleRefresh(e) {
    refreshFixedExpenses()
    refreshVariableExpenses()
    refreshBudgets()
  }

  function handleLogout(e) {
    setUser((prev) => ({
        ...prev,
        isAuthorized: false,
        email: "",
        id: ""
    }))
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
        <Button variant="primary" className='w-100' onClick={()=> setShowAddBudgetModal(true)} >
          Add New Budget
        </Button>
      </Container>
      }
      <AddBudgetModal 
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}/>
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
