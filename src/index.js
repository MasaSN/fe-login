import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PatientDashboard from './portals/PatientDashboard';
import AdminPortal from './portals/AdminPortal';
import ResetPasswordRequest from './components/ResetPasswordRequest';
import ResetPassword from './components/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path:'/patient-dashboard',
    element: <PatientDashboard/>
  },
  {
    path: '/admin-dashboard',
    element: <AdminPortal/>
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>
  },
  {
    path: '/reset-password-request',
    element: <ResetPasswordRequest/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router = {router} /> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();