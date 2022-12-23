import { useState } from "react";

import { redirect, useParams } from "react-router-dom"

import { Button, Stack, Container, Dropdown, ProgressBar, Card } from "react-bootstrap";

import { useBudgets } from "../contexts/BudgetsContext";
import { useExpenses } from "../contexts/ExpensesContext";
import { useIncomes } from "../contexts/IncomesContext";

import EditBudgetModal from "./EditBudgetModal";
import DeleteBudgetModal from "./DeleteBudgetModal";
import AddIncomeModal from "../incomes/AddIncomeModal";
import AddExpenseModal from "../expenses/AddExpenseModal";

import Expenses from "../expenses/Expenses";
import Incomes from "../incomes/Incomes";

import { currencyFormater, getVariant } from "../../utils";

const Budget = ({ handleRefresh }) => {
    const params = useParams();
    const index = params.index ? params.index : null;
    const { budgets } = useBudgets();
    const { expenses } = useExpenses();
    const { incomes } = useIncomes();
    const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false)
    const [showEditBudgetModal, setShowEditBudgetModal] = useState(false)
    const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

    if (!index) return redirect('/dashboard')

    
    if (budgets.length === 0) return <h1>No Budgets Found</h1>
    
    const budget = budgets[index];
    const date = budget.data().monthYear
    const expensesAmounts = budget.data().expenses
    const income = budget.data().incomes
    const cash = budget.data().startingCash

  return (
    <>
        <Container className='my-4'>
            <Card>
                <Card.Body>
                    <Stack direction="horizontal" gap="2" className='justify-content-between align-items-baseline fw-normal fs-3 mb-3'>
                        <h1 className='me-2 '>{date}</h1>
                        <div className='d-flex align-items-baseline'>
                            {currencyFormater.format(expensesAmounts)} 
                            <span className='text-muted fs-6 ms-1'> / {currencyFormater.format(income + cash)}</span>
                        </div>
                    </Stack>
                    <ProgressBar className="rounded-pill" variant={getVariant(expenses, income+cash)} 
                                min={0}
                                max={income + cash}
                                now={expensesAmounts}/>
                    <Stack direction='horizontal' gap='2' className='my-4'>
                            <Dropdown >
                                <Dropdown.Toggle>
                                    Add
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item varian='primary' className='' onClick={() => setShowAddIncomeModal(true)}>Income</Dropdown.Item>
                                    <Dropdown.Item varian='outline-primary' className='' onClick={() => setShowAddExpenseModal(true)}>Expense</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        <Button variant='outline-secondary' className='' onClick={() => setShowEditBudgetModal(true)}>Edit</Button>
                        <Button variant='outline-danger' className='' onClick={() => setShowDeleteBudgetModal(true)}>Delete</Button>
                    </Stack>
                    <div className='fw-normal my-1 d-flex align-items-center fs-6'>
                        <div>Comments:</div> 
                    </div>
                    <div className='mx-4'>
                        {budget.data().comments}
                    </div>
                </Card.Body>
            </Card>
            {expenses.length === 0 ? <></> :
            <Container className="my-4">
                <h4 className="">Expenses</h4>
                <Expenses expenses={expenses} budgetMonthYear={date} handleRefresh={handleRefresh}/>
            </Container>
            }
            {incomes.length === 0 ? <></> :
            <Container className="my-4">
                <h4 className="">Incomes</h4>
                <Incomes incomes={incomes} budgetMonthYear={date} handleRefresh={handleRefresh}/>
            </Container>
            }
        </Container>
        <EditBudgetModal 
            show={showEditBudgetModal}
            handleClose={() => setShowEditBudgetModal(false)}
            budget={budget}/>
        <DeleteBudgetModal
            show={showDeleteBudgetModal}
            handleClose={() => setShowDeleteBudgetModal(false)}
            budgetId={budget.id} />
        <AddIncomeModal
            show={showAddIncomeModal}
            handleClose={() => setShowAddIncomeModal(false)}
            budget_id={budget.id}/>
        <AddExpenseModal
            show={showAddExpenseModal}
            handleClose={() => setShowAddExpenseModal(false)}
            budget_id={budget.id}/>
    </>
  )
}

export default Budget