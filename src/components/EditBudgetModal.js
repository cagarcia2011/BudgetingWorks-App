import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "./contexts/BudgetsContext"

const EditBudgetModal = ({ show, handleClose, budget}) => {
    const startingCashRef = useRef();
    const commentsRef = useRef();

    const { updateBudget } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault()
        const budgetToUpdate = {
            id: budget.id,
            expenses: budget.expenses,
            incomes: budget.incomes,
            startingCash: parseFloat(startingCashRef.current.value),
            user_id: budget.user_id,
            comments: commentsRef.current.value
        }
        updateBudget(budgetToUpdate)
        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose} >
        <Form onSubmit={handleSubmit} >
            <Modal.Header closeButton>
                <Modal.Title>Edit Budget {budget.monthYear}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="d-flex mb-3">
                    <Form.Group className="mx-3">
                        <Form.Label>StartingCash</Form.Label>
                        <div className="d-flex align-items-center">
                            <span className="fs-4">$</span>
                            <Form.Control 
                                className="mx-2"
                                ref={startingCashRef}
                                defaultValue={budget.startingCash}
                                type="number"
                                required
                                min={0}
                                step={0.01}/>
                        </div>
                    </Form.Group>
                </div>
                <div className="d-flex g-1 mb-3">
                    <Form.Group className="mx-3">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={3}
                            className="mx-4"
                            ref={commentsRef}
                            defaultValue={budget.comments}
                            type="text"/>
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}

export default EditBudgetModal