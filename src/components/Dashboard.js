import { useState } from 'react';
import { Stack, Button, ButtonGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';

import { BiRefresh } from 'react-icons/bi'

import { gridStyle } from '../styles/styles';
import BudgetCard from './BudgetCard';

import { useBudgets } from './contexts/BudgetsContext';
import { useFixedExpenses } from './contexts/FixedExpensesContext';
import { useVariableExpenses } from './contexts/VariableExpensesContext';

import AddBudgetModal from './AddBudgetModal';
import AddExpenseModal from './AddExpenseModal';
import { useAuthUser } from './contexts/UserContext';

const Dashboard = () => {
  const {user} = useAuthUser();
  const {budgets, refreshBudgets} = useBudgets();
  const {refreshFixedExpenses} = useFixedExpenses();
  const {refreshVariableExpenses} = useVariableExpenses();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  if (user.isLoading) return <h1>Loading..</h1>

  if (!user.isAuthorized) return <h1>Not Authorized! <Link to='/'>Log In</Link></h1>

  function handleRefresh(e) {
    refreshFixedExpenses()
    refreshVariableExpenses()
    refreshBudgets()
  }

  return (
    <>
      <Container className='my-4'>
      <Stack direction="horizontal" gap="2" className='my-4'>
        <h1 className='me-auto'>Budgets</h1>
        <ButtonGroup >
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Budget</Button>
          <Button variant='primary' onClick={() => setShowAddExpenseModal(true)}>Expense</Button>
          <Button variant='primary' onClick={() => setShowAddIncomeModal(true)}>Income</Button>
          <Button variant='outline-primary'><BiRefresh className='fs-1'
                  onClick={handleRefresh}/></Button>
        </ButtonGroup>
      </Stack>
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
    </>
  )
}

export default Dashboard