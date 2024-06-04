import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.scss'
import App from './App'

import { ModalProvider, AuthProvider, DataProvider, TransactionProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ModalProvider>
      <AuthProvider>
        <DataProvider>
          <TransactionProvider>
            <Router>
              <Routes>
                <Route path='/*' element={<App />} />
              </Routes>
            </Router>
          </TransactionProvider>
        </DataProvider>
      </AuthProvider>
    </ModalProvider>
  </React.StrictMode>
)