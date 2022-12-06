import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { BudgetsProvider } from './components/contexts/BudgetsContext';
import { FixedExpensesProvider } from './components/contexts/FixedExpensesContext';
import { VariableExpensesProvider } from './components/contexts/VariableExpensesContext';
import { IncomesProvider } from './components/contexts/IncomesContext';
import { AuthUserProvider } from './components/contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthUserProvider>
      <BudgetsProvider>
        <FixedExpensesProvider>
          <VariableExpensesProvider>
            <IncomesProvider>
              <App />
            </IncomesProvider>
          </VariableExpensesProvider>
        </FixedExpensesProvider>
      </BudgetsProvider>
    </AuthUserProvider>
  </React.StrictMode>
);
