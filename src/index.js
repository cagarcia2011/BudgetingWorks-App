import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BudgetsProvider } from './components/contexts/BudgetsContext';
import { FixedExpensesProvider } from './components/contexts/FixedExpensesContext';
import { VariableExpensesProvider } from './components/contexts/VariableExpensesContext';
import { AuthUserProvider } from './components/contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthUserProvider>
      <BudgetsProvider>
        <FixedExpensesProvider>
          <VariableExpensesProvider>
            <App />
          </VariableExpensesProvider>
        </FixedExpensesProvider>
      </BudgetsProvider>
    </AuthUserProvider>
  </React.StrictMode>
);
