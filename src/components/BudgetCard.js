import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Card, Container, Stack, Button, ProgressBar } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap';

import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

import { currencyFormater } from '../utils';

import DeleteBudgetModal from './DeleteBudgetModal';
import EditBudgetModal from './EditBudgetModal';
import AddIncomeModal from './AddIncomeModal';
import AddExpenseModal from './AddExpenseModal';

const BudgetCard = ({ budget, index }) => {
    const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false)
    const [showEditBudgetModal, setShowEditBudgetModal] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

    const date = budget.monthYear
    const expenses = budget.expenses
    const income = budget.incomes
    const cash = budget.startingCash
    const id = budget.id

    function handleCommentEye(e) {
        e.preventDefault()
        if (showComments) setShowComments(false)
        else setShowComments(true)
    }

  return (
    <>  
        <Card >
            <Card.Body>
                <Link to={`/budget/${index}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Container>
                        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                            <div className='me-2 '>{date}</div>
                            <div className='d-flex align-items-baseline'>
                                {currencyFormater.format(expenses)} 
                                <span className='text-muted fs-6 ms-1'> / {currencyFormater.format(income + cash)}</span>
                            </div>
                        </Card.Title>
                        <ProgressBar className='rounded-pill' variant={getVariant(expenses, income+cash)}
                                    min={0}
                                    max={income + cash}
                                    now={expenses}/>
                    </Container>
                </Link>
                <div className='fw-normal my-2 d-flex align-items-baseline fs-6'>
                    <div>Comments</div> 
                    <div className='mx-1 fs-5' role='button' onClick={handleCommentEye}>
                        {showComments ? 
                            <AiOutlineEyeInvisible /> :
                            <AiOutlineEye />}
                    </div>
                </div>
                <div className=''>
                    {showComments ? 
                        budget.comments : 
                        <></>}
                </div>
                <Stack direction='horizontal' gap='2' className='mt-4'>
                    <Dropdown >
                        <Dropdown.Toggle>
                            Add
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item varian='primary' className='' onClick={() => setShowAddIncomeModal(true)}>Income</Dropdown.Item>
                            <Dropdown.Item varian='outline-primary' className='' onClick={() => setShowAddExpenseModal(true)}>Expense</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant='outline-secondary' className='' onClick={() => setShowEditBudgetModal(true)}>Edit</Button>
                    <Button variant='outline-danger' className='' onClick={() => setShowDeleteBudgetModal(true)}>Delete</Button>
                </Stack>
            </Card.Body>
        </Card>
        <DeleteBudgetModal 
            date={date}
            show={showDeleteBudgetModal}
            handleClose={() => setShowDeleteBudgetModal(false)}
            budgetId={id}/>
        <EditBudgetModal 
            show={showEditBudgetModal}
            handleClose={() => setShowEditBudgetModal(false)}
            budget={budget}/>
        <AddIncomeModal
            show={showAddIncomeModal}
            handleClose={() => setShowAddIncomeModal(false)}
            budget_id={id}/>
        <AddExpenseModal 
            show={showAddExpenseModal}
            handleClose={() => setShowAddExpenseModal(false)}
            budget_id={id}
            />
    </>
  )
}

const getVariant = (amount, max) => {
    let variant = 'primary'
    if (max > 0) {
        if ((amount / max) >= 0.5) variant='warning';
        if ((amount / max) >= 0.75) variant='danger';
    }

    return variant
}

export default BudgetCard