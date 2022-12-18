import { useRef } from "react"
import { useNavigate, Link } from "react-router-dom"

import { Container, Form, Button } from "react-bootstrap"

import { useAuthUser } from "../contexts/UserContext"

const Login = () => {
  const navigate = useNavigate()
  const { logInWithEmailAndPassword, signInWithGoogle } = useAuthUser();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignIn = async (e) => {
    e.preventDefault()
    await logInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
    navigate("/dashboard")
  }

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault()
    await signInWithGoogle();
    navigate("/dashboard")
  }

  return (
    <Container className='d-flex flex-column align-items-center'>
        <h1 className='mt-5'>BudgetingWorks App</h1>
        <h6 className='my-1'>Site is under development.</h6>
        <Form onSubmit={handleSignIn} className="w-75">
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
          <div className="d-flex flex-column gap-2">
            <Button variant="primary" type="submit">Sign In</Button>
            <Button variant="outline-primary" onClick={handleSignInWithGoogle}>Sign In With Google</Button>
            <Form.Label className="w-100 text-center">
              <Link to={"/register"} >Register now with Email & Password</Link>
            </Form.Label>
          </div>
        </Form>
    </Container>
  )
}

export default Login