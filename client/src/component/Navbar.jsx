import React from 'react'

const Navbar = () => {
  return (
    <nav className='px-6 py-4 bg-gray-900 text-white flex justify-between items-center'>
      <div className='text-xl font-bold'>ระบบจัดการหอพัก</div>

      <ul className='flex gap-6'>
        <li className='cursor-pointer hover:text-gray-400'>หน้าหลัก</li>
        <li className='cursor-pointer hover:text-gray-400'>เกี่ยวกับเรา</li>
        <li className='cursor-pointer hover:text-gray-400'>คุณ วันชัย แซ่ลิ้ม</li>
        <li className='cursor-pointer hover:text-gray-400'>ออกจากระบบ</li>
      </ul>
    </nav>
  )
  
}

export default Navbar