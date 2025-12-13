import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Customer from './component/customers/Customer'
import Sidebar from './component/Sidebar'
import Detail from './component/customers/Detail'
import Dormitory from './component/dormitory/Dormitory'
import DormitoryDetail from './component/dormitory/DormitoryDetail'
import EditDormitory from './component/dormitory/EditDormitory'
import BillList from './component/bills/BillList'
import CreateBill from './component/bills/CreateBill'
import BillDetail from './component/bills/BillDetail.jsx'
import Dashboard from './component/Dashboard'
import { Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  {
    path: '/',
    element: <Sidebar children={<Dashboard />} />
  },
  {
    path: '/dashboard',
    element: <Sidebar children={<Dashboard />} />
  },
  {
    path: '/customers',
    element: <Sidebar children={<Customer />} />
  },
  {
    path: '/customers/:id',
    element: <Sidebar children={<Detail />} />
  },
  {
    path: '/dormitory',
    element: <Sidebar children={<Dormitory />} />
  },
  {
    path: '/dormitory/:id',
    element: <Sidebar children={<DormitoryDetail />} />
  },
  {
    path: '/dormitory/edit/:id',
    element: <Sidebar children={<EditDormitory />} />
  },
  {
    path: '/bills',
    element: <Sidebar children={<BillList />} />
  },
  {
    path: '/bills/create',
    element: <Sidebar children={<CreateBill />} />
  },
  {
    path: '/bills/:id',
    element: <Sidebar children={<BillDetail />} />
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
