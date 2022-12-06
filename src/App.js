import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path='/' exact/>
          <Route element={<Dashboard />} path='/dashboard/*' exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
