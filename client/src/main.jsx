import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Customer from './component/customers/Customer'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/customers',
    element: <Customer />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
