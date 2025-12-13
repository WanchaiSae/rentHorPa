import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useDormitoryStore from '../../store/Dormitory'

const Dormitory = () => {
  const { dormitories, fetchDormitories, deleteDormitory } = useDormitoryStore()

  useEffect(() => {
    fetchDormitories()
  }, [fetchDormitories])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this dormitory?')) {
      deleteDormitory(id)
    }
  }

  return (
    <div>
      <h1 className='text-2xl'>จัดการหอพัก</h1>
      <hr className='border-gray-200 my-4'></hr>
      <div>
        <button className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600'>เพิ่มหอพัก</button>
      </div>

      <hr className='border-gray-200 my-4'></hr>
      {/* Show dormitory list */}
      <div>
        <table className='w-full border-collapse border border-gray-500'>
          <thead>
            <tr>
              <th className='border border-gray-500 p-2'>ลำดับ</th>
              <th className='border border-gray-500 p-2'>ชื่อหอพัก</th>
              <th className='border border-gray-500 p-2'>ที่อยู่</th>
              <th className='border border-gray-500 p-2'>จำนวนห้อง</th>
              <th className='border border-gray-500 p-2'>แผนที่</th>
              <th className='border border-gray-500 p-2'>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {dormitories.length > 0 ? (
              dormitories.map((dorm, index) => (
                <tr key={dorm.dorm_id || index}>
                  <td className='border border-gray-500 p-2 text-center'> {dorm.dorm_id}</td>
                  <td className='border border-gray-500 p-2'>{dorm.dorm_name || dorm.name || 'N/A'}</td>
                  <td className='border border-gray-500 p-2'>{dorm.address || 'N/A'}</td>
                  <td className='border border-gray-500 p-2 text-center'>
                    {dorm.rooms ? dorm.rooms.length : 0}
                  </td>
                  <td className='border border-gray-500 p-2'>{dorm.map || 'N/A'}</td>
                  <td className='border border-gray-500 p-2 text-center space-x-2'>
                    <Link to={`/dormitory/${dorm.dorm_id}`}>
                      <button className='bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600'>รายละเอียด</button>
                    </Link>
                    <Link to={`/dormitory/edit/${dorm.dorm_id}`}>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600'>แก้ไข</button>
                    </Link>
                    <button onClick={() => handleDelete(dorm.dorm_id)} className='bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600'>ลบ</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-500 p-2 text-center">ไม่พบข้อมูลหอพัก</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dormitory