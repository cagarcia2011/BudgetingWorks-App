import { Form, Modal, Button, FloatingLabel, InputGroup } from "react-bootstrap"
import { useRef, useState } from "react"

import { useAuthUser } from "./contexts/UserContext"
import { useBudgets } from "./contexts/BudgetsContext"
import { useFixedExpenses } from "./contexts/FixedExpensesContext"
import { useVariableExpenses } from "./contexts/VariableExpensesContext"

import { parseDate } from "../utils/dateUtils"

const AddExpenseModal = ({show, handleClose}) => {
    const {user} = useAuthUser();
    const {budgets, refreshBudgets} = useBudgets()
    const { saveFixedExpense, refreshFixedExpenses} = useFixedExpenses()
    const { saveVariableExpense, refreshVariableExpenses } = useVariableExpenses()

    const [isVariable, setIsVariable] = useState(true)

    const categoryRef = useRef()
    const typeRef = useRef()
    const budgetRef = useRef()
    const amountRef = useRef()
    const commentsRef = useRef()
    const txnDateRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        let txnDay = parseDate(txnDateRef.current.value).getDay()
        if ( typeof(txnDay) !== "number") {
            txnDay = 1
        }
        const category = categoryRef.current.value
        const amount = amountRef.current.value
        const comments = commentsRef.current.value
        if (isVariable) {
            const budget_id = budgetRef.current.value

            const expense = {
                user_id: user.id,
                category: category,
                txnDay: txnDay,
                comments: comments,
                amount: amount,
                monthlyBudget_id: budget_id
            }

            saveVariableExpense(expense)
            refreshVariableExpenses()
        } else {
            const expense = {
                user_id: user.id,
                category: category,
                txnDay: txnDay,
                comments: comments,
                amount: amount
            }

            saveFixedExpense(expense)
            refreshFixedExpenses()
        }

        refreshBudgets()
        handleClose()
    }

    function handleTypeChange(e) {
        const type = e.target.value
        setIsVariable(type==="variable")
    }

    return (
        <Modal show={show} onHide={handleClose} >
            <Form onSubmit={handleSubmit} >
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                
                <Modal.Body >
                    <Form.Group className="">
                        <FloatingLabel 
                            label="Expense Type">
                            <Form.Select 
                                className="" 
                                ref={typeRef} 
                                defaultValue="variable"
                                onChange={handleTypeChange}
                                >
                                <option value="variable" >One Time Expense</option> 
                                <option value="fixed" >Recurring Expense</option> 
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="my-3" controlId="txnd">
                        <FloatingLabel 
                            label="Transaction Date">
                            <Form.Control 
                                className=""
                                ref={txnDateRef}
                                type="date"
                                name="txnd"
                                />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <FloatingLabel 
                            label="Category">
                            <Form.Control 
                                className=""
                                defaultValue={"Uncategorized"}
                                ref={categoryRef}
                                type="text"/>
                        </FloatingLabel>
                    </Form.Group>
                    {
                        isVariable ?
                        <Form.Group className="my-3">
                            <FloatingLabel
                                label="Budget">
                                <Form.Select className="" ref={budgetRef}>
                                    {budgets.length ? budgets.map((budget) => (
                                        <option value={budget.id} key={budget.id}>{budget.monthYear}</option>
                                    )) : <option value="0">No Budgets Found</option>}
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                        : <></>
                    }
                    <Form.Group className="my-3">
                        <Form.Label>Amount</Form.Label>
                        <InputGroup>
                            <InputGroup.Text >$</InputGroup.Text>
                            <Form.Control 
                                type="number"
                                ref={amountRef}
                                defaultValue={0.00}
                                required
                                min={0}
                                step={0.01}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <FloatingLabel
                            label="Comments">
                            <Form.Control 
                                as="textarea"
                                rows={4}
                                className=""
                                ref={commentsRef}/>
                        </FloatingLabel>
                    </Form.Group>
                    <div className="d-flex justify-content-end my-3">
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
      )
}

export default AddExpenseModal