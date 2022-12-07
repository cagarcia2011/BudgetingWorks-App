import React from 'react'
import { Modal, Form, Stack, Button } from 'react-bootstrap'

import { useIncomes } from './contexts/IncomesContext'

import { currencyFormater } from '../utils';

function DeleteIncomeModal({show, handleClose, incomeId, incomeCategory, incomeAmount, budgetMonthYear}) {
    const { deleteIncome, refreshIncomes } = useIncomes();
    
    function handleSubmit(e) {
        e.preventDefault()
        deleteIncome(incomeId)
        refreshIncomes()
    }
  return (
    <Modal show={show} onHide={handleClose} >
        <Form onSubmit={handleSubmit} >
            <Modal.Header closeButton>
                <Modal.Title>Delete Income</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form.Label>
                    Category: {incomeCategory}
                </Form.Label>
                <Form.Label>
                    Budget: {budgetMonthYear}
                </Form.Label> 
                <Form.Label>
                    Amount: {currencyFormater.format(incomeAmount)}
                </Form.Label>                   
                <Stack direction='horizontal' gap='2' className='mt-4'>
                    <Button variant='danger' type="submit">
                        Delete
                    </Button>
                    <Button variant="outline-primary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                </Stack>
            </Modal.Body>
        </Form>
    </Modal>
    )
}

export default DeleteIncomeModal