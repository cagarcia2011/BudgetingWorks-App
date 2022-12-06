import { Card } from 'react-bootstrap';
import { currencyFormater } from '../utils';
import { Stack, Button, ProgressBar } from 'react-bootstrap'
import { useState } from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import DeleteBudgetModal from './DeleteBudgetModal';
import EditBudgetModal from './EditBudgetModal';
import { Link } from 'react-router-dom';

const BudgetCard = ({ budget, index }) => {
    const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false)
    const [showEditBudgetModal, setShowEditBudgetModal] = useState(false)
    const [showComments, setShowComments] = useState(false)

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