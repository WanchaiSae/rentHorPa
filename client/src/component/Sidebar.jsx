import React from 'react'
import { FaUserEdit } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { RxDashboard } from "react-icons/rx";


const Sidebar = ({ children }) => {
  return (

    <>
      <Navbar />
      <div className='flex h-screen text-white '>
        <aside className='w-64 bg-gray-900'>
          <h1 className='text-2xl font-bold text-center mt-3'>เมนูจัดการ</h1>
          <ul className='space-y mt-4 text-white pl-6'>
            <Link to={'/dashboard'}><li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><RxDashboard className='mr-2' /> Dashboard</li></Link>
            <Link to={'/users'}><li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><FaUserEdit className='mr-2' /> จัดการระบบผู้ใช้</li></Link>
            <Link to={'/dormitory'}><li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><MdHomeWork className='mr-2' />จัดการหอพัก</li></Link>
            <Link to={'/customers'}><li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><FaUserFriends className='mr-2' />จัดการลูกค้า</li></Link>
            <Link to={'/bills'}><li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><RiBillFill className='mr-2' />จัดการบิล</li></Link>
          </ul>
        </aside>

        <div className='flex-1 p-8 text-black'>
          {children}
        </div>

      </div>
    </>
  )
}

export default Sidebar