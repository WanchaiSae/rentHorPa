import React from 'react'
import { FaUserEdit } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Sidebar = ({ children }) => {
  return (

    <>
      <Navbar />
      <div className='flex h-screen text-white '>
        <aside className='w-64 bg-gray-900'>
          <h1 className='text-2xl font-bold text-center mt-3'>เมนูจัดการ</h1>
          <ul className='space-y mt-4 text-white pl-6'>
            <li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><FaUserEdit className='mr-2' /> จัดการระบบผู้ใช้</li>
            <li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><MdHomeWork className='mr-2' />จัดการหอพัก</li>
            <Link to={'/customers'}><li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><FaUserFriends className='mr-2' />จัดการลูกค้า</li></Link>
            <li className='p-2 rounded cursor-pointer flex items-center hover:text-gray-400'><RiBillFill className='mr-2' />จัดการบิล</li>
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