import { useParams } from "react-router-dom"
import { useBudgets } from "./contexts/BudgetsContext";
import { currencyFormater } from "../utils";
import { Button, Stack } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import EditBudgetModal from "./EditBudgetModal";
import { useAuthUser } from "./contexts/UserContext";

const Budget = () => {
    const params = useParams();
    const {user} = useAuthUser();
    const { budgets } = useBudgets();
    // const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false)
    const [showEditBudgetModal, setShowEditBudgetModal] = useState(false)
    const index = params.index ? params.index : null;

    if (!index) return <>404</>

    if (user.isLoading) return <h1>Loading..</h1>

    if (!user.isAuthorized) return <h1>Not Authorized! <Link to='/'>Log In</Link></h1>
    
    if (budgets.length === 0) return <h1>No Budgets Found</h1>
    
    const budget = budgets[index];
    const date = budget.monthYear
    const expenses = budget.expenses
    const income = budget.incomes
    const cash = budget.startingCash
  return (
    <>
        <Container className='my-4'>
            <Stack direction="horizontal" gap="2" className='justify-content-between align-items-baseline fw-normal fs-3 mb-3'>
                <h1 className='me-2 '>Budget {date}</h1>
                <div className='d-flex align-items-baseline'>
                    {currencyFormater.format(expenses)} 
                    <span className='text-muted fs-6 ms-1'> / {currencyFormater.format(income + cash)}</span>
                </div>
            </Stack>
            <Stack direction='horizontal' gap='2' className='my-4'>
                <Button variant='primary' className='ms-auto'>Add Income</Button>
                <Button variant='outline-primary' className=''>Add Expense</Button>
                <Button variant='outline-secondary' className='' onClick={() => setShowEditBudgetModal(true)}>Edit</Button>
            </Stack>
            <div className='fw-normal my-1 d-flex align-items-center fs-6'>
                <div>Comments:</div> 
            </div>
            <div className='mx-4'>
                {budget.comments}
            </div>
        </Container>
        <EditBudgetModal 
            show={showEditBudgetModal}
            handleClose={() => setShowEditBudgetModal(false)}
            budget={budget}/>
    </>
  )
}

export default Budget