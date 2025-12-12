import React from 'react'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import Customer from './component/customers/Customer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar children={<Customer />} />
    </div>
  )
}

export default App