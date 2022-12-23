import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { Card, Container, Stack, Button } from 'react-bootstrap'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { currencyFormater } from '../../utils'

import DeleteIncomeModal from './DeleteIncomeModal'

const IncomeCard = ({ income, index, budgetMonthYear, handleRefresh }) => {
    const [showDeleteIncomeModal, setShowDeleteIncomeModal] = useState(false)
    const [showComments, setShowComments] = useState(false)

    const amount = income.data().amount
    const category = income.data().category
    const comments = income.data().comments
    
    function handleShowComment(e) {
        e.preventDefault()
        setShowComments(prev => !prev)
    }
    return (
    <>
        <Card>
            <Card.Body>
                <Link to={`./income/${index}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Container>
                        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                            <div className='me-2'>Income: {category}</div>
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
                    <Button variant='outline-danger' onClick={() => setShowDeleteIncomeModal(true)}>
                        Delete
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
        <DeleteIncomeModal
            show={showDeleteIncomeModal}
            incomeId={income.id}
            incomeCategory={category}
            incomeAmount={amount}
            budgetMonthYear={budgetMonthYear}
            handleClose={() => {
                setShowDeleteIncomeModal(false)
                handleRefresh()
            }}
            />
    </>
  )
}

export default IncomeCard