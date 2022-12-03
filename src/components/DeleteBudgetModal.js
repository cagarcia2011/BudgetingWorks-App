import { Form, Modal, Button, Stack } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "./contexts/BudgetsContext"

const DeleteBudgetModal = ({ date, show, budgetId, handleClose }) => {
    const { deleteBudget } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault()
        deleteBudget(budgetId)
        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose} >
        <Form onSubmit={handleSubmit} >
            <Modal.Header closeButton>
                <Modal.Title>Delete Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form.Label>
                    {date}
                </Form.Label>
                <Stack direction='horizontal' gap='2' className='mt-4'>
                    <Button variant="danger" type="submit">
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

export default DeleteBudgetModal