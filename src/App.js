import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path='/' exact/>
          <Route element={<Register />} path='/register' exact/>
          <Route element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          } path='/dashboard/*' exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
