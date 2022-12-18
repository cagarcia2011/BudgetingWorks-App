import { useRef } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"
import { getMonthYear } from "../../utils/dateUtils"

const AddBudgetModal = ({show, handleClose, userId}) => {
    const monthRef = useRef();
    const yearRef = useRef();
    const startingCashRef = useRef();
    const commentsRef = useRef();

    const { saveBudget } = useBudgets();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const month = parseInt(monthRef.current.value)
        const year = parseInt(yearRef.current.value)
        const budget = {
            month: month,
            year: year,
            monthYear: getMonthYear(month, year),
            startingCash: parseFloat(startingCashRef.current.value),
            expenses: 0.0,
            incomes: 0.0,
            comments: commentsRef.current.value,
            uid: userId
        }
        await saveBudget(budget)
        handleClose()
    }

  return (
    <Modal show={show} onHide={handleClose} >
        <Form onSubmit={handleSubmit} >
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="d-flex mb-3">
                    <Form.Group className="mx-3">
                        <Form.Label>Month</Form.Label>
                        <Form.Control 
                            ref={monthRef}
                            type="number"
                            defaultValue={1}
                            required
                            min={1}
                            max={12}
                            step={1}/>
                    </Form.Group>
                    <Form.Group className="mx-3">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            ref={yearRef}
                            type="number"
                            defaultValue={2022}
                            required
                            min={2000}
                            max={2100}
                            step={1}/>
                    </Form.Group>
                </div>
                <div className="d-flex g-1 mb-3">
                    <Form.Group className="mx-3">
                        <Form.Label>StartingCash</Form.Label>
                        <div className="d-flex align-items-center">
                            <span className="fs-4">$</span>
                            <Form.Control 
                                className="mx-2"
                                ref={startingCashRef}
                                defaultValue={0.00}
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
                            type="text"/>
                    </Form.Group>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}

export default AddBudgetModal