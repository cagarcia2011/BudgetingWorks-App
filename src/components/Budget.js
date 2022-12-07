import { useState } from "react";

import { redirect, useParams } from "react-router-dom"

import { Button, Stack, Container, Dropdown, ProgressBar } from "react-bootstrap";

import EditBudgetModal from "./EditBudgetModal";
import DeleteBudgetModal from "./DeleteBudgetModal";
import AddIncomeModal from "./AddIncomeModal";
import AddExpenseModal from "./AddExpenseModal";
import { useBudgets } from "./contexts/BudgetsContext";
import { useAuthUser } from "./contexts/UserContext";
import { currencyFormater, getVariant } from "../utils";
import { useFixedExpenses } from "./contexts/FixedExpensesContext";
import { useVariableExpenses } from "./contexts/VariableExpensesContext";
import Expenses from "./Expenses";

const Budget = ({ handleRefresh }) => {
    const params = useParams();
    const index = params.index ? params.index : null;
    const {user} = useAuthUser();
    const { budgets } = useBudgets();
    const { fixedExpenses } = useFixedExpenses();
    const { variableExpenses } = useVariableExpenses();
    const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false)
    const [showEditBudgetModal, setShowEditBudgetModal] = useState(false)
    const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

    if (!index) return redirect('/dashboard')

    if (user.isLoading) return <h1>Loading..</h1>

    if (!user.isAuthorized) return redirect('/')
    
    if (budgets.length === 0) return <h1>No Budgets Found</h1>
    
    const budget = budgets[index];
    const date = budget.monthYear
    const expenses = budget.expenses
    const income = budget.incomes
    const cash = budget.startingCash

    function extractVariableExpenses(expenses) {
        if (variableExpenses.length === 0) return []

        return variableExpenses.filter((expense) => {
            return expense.monthlyBudget_id === budget.id
        })
    }

  return (
    <>
        <Container className='my-4'>
            <Stack direction="horizontal" gap="2" className='justify-content-between align-items-baseline fw-normal fs-3 mb-3'>
                <h1 className='me-2 '>{date}</h1>
                <div className='d-flex align-items-baseline'>
                    {currencyFormater.format(expenses)} 
                    <span className='text-muted fs-6 ms-1'> / {currencyFormater.format(income + cash)}</span>
                </div>
            </Stack>
            <ProgressBar className="rounded-pill" variant={getVariant(expenses, income+cash)} 
                        min={0}
                        max={income + cash}
                        now={expenses}/>
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
                {budget.comments}
            </div>
            {variableExpenses.length === 0 ? <></> :  
            <Container className="my-4">
                <h4 className="">Variable Expenses</h4>
                <Expenses expenses={extractVariableExpenses(variableExpenses)} budgetMonthYear={date} type={"variable"} handleRefresh={handleRefresh}/>
            </Container>
            }
            {fixedExpenses.length === 0 ? <></> :
            <Container className="my-4">
                <h4 className="">Fixed Expenses</h4>
                <Expenses expenses={fixedExpenses} budgetMonthYear={date} type={"fixed"} handleRefresh={handleRefresh}/>
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