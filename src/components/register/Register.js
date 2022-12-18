import { useRef } from "react"
import { useNavigate, Link } from "react-router-dom"

import { Container, Form, Button } from "react-bootstrap"

import { useAuthUser } from "../contexts/UserContext"

const Register = () => {
  const navigate = useNavigate()
  const { registerWithEmailAndPassword } = useAuthUser();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();

  const handleSignIn = (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordRepeatRef.current.value) {
      alert("Password does not match! Try again.")
      return
    }
    registerWithEmailAndPassword(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
    navigate("/dashboard")
  }


  return (
    <Container className='d-flex flex-column align-items-center'>
        <h1 className='mt-5'>BudgetingWorks App</h1>
        <h6 className='my-1'>Site is under development.</h6>
        <Form onSubmit={handleSignIn} className="w-75">
          <Form.Group className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              ref={nameRef}
              type="text"
              required/>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              ref={emailRef}
              type="email"
              required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              ref={passwordRef}
              type="password"
              required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control 
              ref={passwordRepeatRef}
              type="password"
              required/>
          </Form.Group>
          <div className="d-flex flex-column gap-2">
            <Button variant="primary" type="submit">Register</Button>
            <Form.Label className="w-100 text-center">
              <Link to={"/"} >Sign in</Link>
            </Form.Label>
          </div>
        </Form>
    </Container>
  )
}

export default Register