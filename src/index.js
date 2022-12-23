import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { AuthUserProvider } from './components/contexts/UserContext';
import { IncomesProvider } from './components/contexts/IncomesContext';
import { ExpensesProvider } from './components/contexts/ExpensesContext';
import { BudgetsProvider } from './components/contexts/BudgetsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthUserProvider>
      <IncomesProvider>
        <ExpensesProvider>
          <BudgetsProvider>
            <App />
          </BudgetsProvider>
        </ExpensesProvider>
      </IncomesProvider>
    </AuthUserProvider>
  </React.StrictMode>
);
