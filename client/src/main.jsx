import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Customer from './component/customers/Customer'
import Sidebar from './component/Sidebar'
import Detail from './component/customers/Detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/customers',
    element: <Sidebar children={<Customer />} />
  },
  {
    path: '/customers/:id',
    element: <Sidebar children={<Detail />} />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
