import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

const EditBudgetModal = ({ show, handleClose, budget}) => {
    const startingCashRef = useRef();
    const commentsRef = useRef();

    const { updateBudget } = useBudgets();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const budgetData = budget.data()
        const startingCash = parseFloat(startingCashRef.current.value)
        const budgetToUpdate = {
            monthYear: budgetData.monthYear,
            month: budgetData.month,
            year: budgetData.year,
            expenses: budgetData.expenses,
            incomes: budgetData.incomes,
            startingCash: startingCash,
            uid: budgetData.uid,
            comments: commentsRef.current.value
        }
        await updateBudget(budget.id, budgetToUpdate)
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