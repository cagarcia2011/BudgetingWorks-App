import React from 'react'
import { Modal, Form, Stack, Button } from 'react-bootstrap';

import { useExpenses } from "../contexts/ExpensesContext"

import { currencyFormater } from '../../utils';

function DeleteExpenseModal({ show, expenseId, expenseType, expenseCategory, expenseAmount, budgetMonthYear, handleClose}) {
    const { deleteExpense, refreshExpenses } = useExpenses();

    function handleSubmit(e) {
        e.preventDefault()
        deleteExpense(expenseId)
        refreshExpenses()
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} >
            <Form onSubmit={handleSubmit} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Stack direction='vertical' gap='2'>
                        <Form.Label>
                            Category: {expenseCategory}
                        </Form.Label>
                        <Form.Label>
                            Budget: {budgetMonthYear}
                        </Form.Label> 
                        <Form.Label>
                            Amount: {currencyFormater.format(expenseAmount)}
                        </Form.Label>                   
                    </Stack>
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

export default DeleteExpenseModal