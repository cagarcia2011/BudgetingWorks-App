import { useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container'

import { gridStyle } from '../styles/styles';
import BudgetCard from './BudgetCard';

import { useBudgets } from './contexts/BudgetsContext';
import { useFixedExpenses } from './contexts/FixedExpensesContext';
import { useVariableExpenses } from './contexts/VariableExpensesContext';

import AddBudgetModal from './AddBudgetModal';
import AddExpenseModal from './AddExpenseModal';
import AddIncomeModal from './AddIncomeModal';
import { useAuthUser } from './contexts/UserContext';
import NavBar from './NavBar';

const Dashboard = () => {
  const {user, setUser} = useAuthUser();
  const {budgets, refreshBudgets} = useBudgets();
  const {refreshFixedExpenses} = useFixedExpenses();
  const {refreshVariableExpenses} = useVariableExpenses();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  if (user.isLoading) return <h1>Loading...</h1>

  if (!user.isAuthorized) return <h1>Not Authorized! <Link to='/'>Log In</Link></h1>

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
  }

  return (
    <>
      <NavBar 
        handleRefresh={handleRefresh} 
        handleLogout={handleLogout} 
        setShowAddBudgetModal={setShowAddBudgetModal}
        setShowAddIncomeModal={setShowAddIncomeModal}
        setShowAddExpenseModal={setShowAddExpenseModal}
        />
      <Container className='my-4'>
        <div style={gridStyle}>
          {budgets.map((budget, index) => (
            <BudgetCard key={budget.id} budget={budget} index={index}/>
          ))}
        </div>
      </Container>
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
