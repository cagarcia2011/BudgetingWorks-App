
import '@passageidentity/passage-auth'

const Login = () => {
  return (
    <div className='d-flex flex-column align-items-center'>
        <h1 className='my-2'>BudgetingWorks App</h1>
        <h2 className='my-1'>Site is under development.</h2>
        <passage-auth app-id={process.env.REACT_APP_PASSAGE_ID} className='text-light'>
        </passage-auth>
    </div>
  )
}

export default Login