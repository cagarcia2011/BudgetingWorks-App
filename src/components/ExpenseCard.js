import React from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom'

import { Card, Container, Stack, Button } from 'react-bootstrap'

import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

import { currencyFormater } from '../utils'

import DeleteExpenseModal from './DeleteExpenseModal';
// import EditExpenseModal from './EditExpenseModal;

function ExpenseCard({ expense, type, index, budgetMonthYear, handleRefresh }) {
    const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false)
    const [showComments, setShowComments] = useState(false)

    const amount = expense.amount
    const category = expense.category
    const comments = expense.comments
    const typeText = type === 'variable' ? 'Variable' : 'Fixed'

    function handleShowComment(e) {
        e.preventDefault()
        if (showComments) setShowComments(false)
        else setShowComments(true)
    }

  return (
    <>
        <Card >
            <Card.Body>
                <Link to={`./expense/${index}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Container>
                        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                            <div className='me-2'>{typeText} Expense: {category}</div>
                            <div className='d-flex align-items-baseline'>
                                {currencyFormater.format(amount)}
                            </div>
                        </Card.Title>
                    </Container>
                </Link>
                <div className='fw-normal my-2 d-flex align-items-baseline fs-6'>
                    <div>Comments</div> 
                    <div className='mx-1 fs-5' role='button' onClick={handleShowComment}>
                        {showComments ? 
                            <AiOutlineEyeInvisible /> :
                            <AiOutlineEye />}
                    </div>
                </div>
                <div className=''>
                    {showComments ? 
                        comments : 
                        <></>}
                </div>
                <Stack direction='horizontal' gap='2' className='mt-4'>
                    <Button variant='outline-danger' onClick={() => setShowDeleteExpenseModal(true)}>
                        Delete
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
        <DeleteExpenseModal
            show={showDeleteExpenseModal}
            expenseId={expense.id}
            expenseType={type}
            expenseCategory={category}
            expenseAmount={amount}
            budgetMonthYear={budgetMonthYear}
            handleClose={() => {
                setShowDeleteExpenseModal(false)
                handleRefresh()
            }}/>
    </>
  )
}

export default ExpenseCard