import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Budget from './components/Budget';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path='/' exact/>
          <Route element={<Dashboard />} path='/dashboard' exact/>
          <Route element={<Budget />} path='/budget/:index' exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
