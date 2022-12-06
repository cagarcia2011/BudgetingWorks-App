import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Button, Offcanvas } from 'react-bootstrap'

import {MdDeveloperMode} from 'react-icons/md'
import {BiRefresh, BiLogOut} from 'react-icons/bi'

function NavBar({handleRefresh, handleLogout, setShowAddBudgetModal, setShowAddExpenseModal, setShowAddIncomeModal}) {
  return (
    <Navbar bg="light" variant="light" expand="sm" fixed="top" className="nav-bar">
        <Container>
          <Navbar.Brand className='title nav-bar' href=''>
              BudgetingWorks
              <p className='me-auto subtitle'><MdDeveloperMode className='subtitle'/> Site is under development</p>
          </Navbar.Brand>
          <Nav.Item>
            <Button variant='outline-light'><BiRefresh className='fs-1'
                    onClick={handleRefresh}/></Button>
          </Nav.Item>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='nav-bar' />
          <Navbar.Offcanvas className=''>
            <Container>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={'offcanvasNavbarLabel-expand-sm'}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <NavDropdown 
                    title="Add"
                    className='my-2'
                    >                      
                    <NavDropdown.Item 
                      onClick={() => setShowAddBudgetModal(true)}
                      className=''>
                      Budget
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      onClick={() => setShowAddExpenseModal(true)}
                      className=''>
                      Expense
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      onClick={() => setShowAddIncomeModal(true)}
                      className=''>
                      Income
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Item>
                    <Button variant='outline-primary' onClick={handleLogout} className='my-2'>
                      Log out<BiLogOut className=''/>
                    </Button>
                  </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Container>
          </Navbar.Offcanvas>
        </Container>
    </Navbar>
  )
}

export default NavBar