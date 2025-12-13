import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useDormitoryStore from '../../store/Dormitory'
import useRoomStore from '../../store/roomStore'
import useCustomerStore from '../../store/customerStore'
import useRentalStore from '../../store/rentalStore'

const DormitoryDetail = () => {
    const { id } = useParams()

    const { dormitory, fetchDormitoryById, isLoading: isDormLoading } = useDormitoryStore()
    const { addRoom, updateRoom, deleteRoom, isLoading: isRoomLoading } = useRoomStore()
    const { customers, fetchCustomers } = useCustomerStore()
    const { addRental } = useRentalStore()

    const [showModal, setShowModal] = useState(false)
    const [showRentModal, setShowRentModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentRoomId, setCurrentRoomId] = useState(null)
    const [currentRoomNumber, setCurrentRoomNumber] = useState('')

    // Room Form
    const [roomForm, setRoomForm] = useState({
        room_number: '',
        room_type: 0, // 0 = Fan, 1 = Air
        price: '',
        status: 1 // 1 = Vacant, 0 = Occupied
    })

    // Rental Form
    const [rentalForm, setRentalForm] = useState({
        customer_id: '',
        deposit: '',
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10) // 1 Year contract
    })

    useEffect(() => {
        fetchDormitoryById(id)
        fetchCustomers()
    }, [fetchDormitoryById, fetchCustomers, id])

    const handleAddClick = () => {
        setIsEditing(false)
        setRoomForm({ room_number: '', room_type: 0, price: '', status: 1 })
        setShowModal(true)
    }

    const handleEditClick = (room) => {
        setIsEditing(true)
        setCurrentRoomId(room.room_id)
        setRoomForm({
            room_number: room.room_number,
            room_type: room.room_type,
            price: room.price,
            status: room.status
        })
        setShowModal(true)
    }

    const handleRentClick = (room) => {
        setCurrentRoomId(room.room_id)
        setCurrentRoomNumber(room.room_number)
        setRentalForm({
            customer_id: '',
            deposit: '',
            start_date: new Date().toISOString().slice(0, 10),
            end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10)
        })
        setShowRentModal(true)
    }

    const handleDeleteClick = async (roomId) => {
        if (window.confirm('คุณต้องการลบห้องพักนี้ใช่หรือไม่?')) {
            await deleteRoom(roomId)
            fetchDormitoryById(id) // Refresh list
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = { ...roomForm, dorm_id: Number(id) }

            if (isEditing) {
                await updateRoom(currentRoomId, payload)
            } else {
                await addRoom(payload)
            }
            setShowModal(false)
            fetchDormitoryById(id) // Refresh list
        } catch (error) {
            alert('เกิดข้อผิดพลาด: ' + error.message)
        }
    }

    const handleRentSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = { ...rentalForm, room_id: currentRoomId }
            await addRental(payload)
            setShowRentModal(false)
            alert('ทำสัญญาเช่าเรียบร้อยแล้ว')
            fetchDormitoryById(id) // Refresh list (Room status should update)
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการทำสัญญา: ' + error.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setRoomForm(prev => ({ ...prev, [name]: value }))
    }

    const handleRentalChange = (e) => {
        const { name, value } = e.target
        setRentalForm(prev => ({ ...prev, [name]: value }))
    }

    if (isDormLoading) return <div className="p-4">Loading...</div>
    if (!dormitory) return <div className="p-4">ไม่พบข้อมูลหอพัก</div>

    return (
        <div className="p-6 relative">
            <h1 className="text-2xl font-bold mb-4">รายละเอียดหอพัก</h1>
            <hr className="border-gray-200 my-4" />

            <div className="bg-white shadow rounded-lg p-6 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="font-bold text-gray-700">ชื่อหอพัก:</label>
                        <p className="mt-1 text-gray-900">{dormitory.dorm_name || '-'}</p>
                    </div>
                    <div>
                        <label className="font-bold text-gray-700">ที่อยู่:</label>
                        <p className="mt-1 text-gray-900">{dormitory.address || '-'}</p>
                    </div>
                    <div>
                        <label className="font-bold text-gray-700">แผนที่:</label>
                        <p className="mt-1 text-gray-900">{dormitory.map || '-'}</p>
                    </div>
                    <div>
                        <label className="font-bold text-gray-700">จำนวนห้องพัก:</label>
                        <p className="mt-1 text-gray-900 font-semibold text-lg text-blue-600">
                            {dormitory.rooms ? dormitory.rooms.length : 0} ห้อง
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
                    <h3 className="font-bold text-lg">รายชื่อห้องพัก</h3>
                    <button
                        onClick={handleAddClick}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    >
                        + เพิ่มห้อง
                    </button>
                </div>

                {dormitory.rooms && dormitory.rooms.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {dormitory.rooms.map((room) => (
                            <div key={room.room_id} className="border p-3 rounded bg-gray-50 relative group hover:shadow-md transition-shadow">
                                <div className="text-center pt-4">
                                    <span className="font-bold text-xl text-gray-800 block">{room.room_number}</span>
                                    <div className="text-sm text-gray-600 mt-1">
                                        {room.room_type === 1 ? 'แอร์' : 'พัดลม'} | {Number(room.price).toLocaleString()} บ.
                                    </div>
                                    <div className={`text-xs font-semibold mt-1 ${room.status === 1 ? 'text-green-600' : 'text-red-600'}`}>
                                        {room.status === 1 ? 'ว่าง' : 'ไม่ว่าง'}
                                    </div>

                                    {/* Tenant Info */}
                                    {room.status === 0 && room.rentals && room.rentals.length > 0 && (
                                        <div className="text-xs text-gray-500 mt-2 bg-gray-100 p-1 rounded">
                                            <span className="font-semibold text-gray-700">ผู้เช่า:</span> <br />
                                            {room.rentals[room.rentals.length - 1].customer?.first_name} {room.rentals[room.rentals.length - 1].customer?.last_name}
                                        </div>
                                    )}

                                    {room.status === 1 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent bubbling if necessary
                                                handleRentClick(room);
                                            }}
                                            className="mt-3 w-full bg-blue-100 text-blue-700 text-sm py-1.5 rounded hover:bg-blue-200 font-semibold z-10 relative"
                                        >
                                            ทำสัญญา/เข้าอยู่
                                        </button>
                                    )}
                                </div>
                                {/* Actions Area - Top Right */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex space-x-1 transition-opacity">
                                    <button
                                        onClick={() => handleEditClick(room)}
                                        className="bg-white text-gray-600 p-1.5 rounded shadow hover:bg-gray-100 border border-gray-200"
                                        title="แก้ไขห้อง"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(room.room_id)}
                                        className="bg-white text-red-600 p-1.5 rounded shadow hover:bg-red-50 border border-gray-200"
                                        title="ลบห้อง"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-500 border rounded bg-gray-50">
                        ยังไม่มีข้อมูลห้องพัก
                    </div>
                )}

                <div className="mt-8 flex space-x-3 pt-4 border-t">
                    <Link
                        to="/dormitory"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        ย้อนกลับ
                    </Link>
                    <Link
                        to={`/dormitory/edit/${dormitory.dorm_id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        แก้ไขข้อมูลหอพัก
                    </Link>
                </div>
            </div>

            {/* Room Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? 'แก้ไขห้องพัก' : 'เพิ่มห้องพัก'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">เลขห้อง / ชื่อห้อง</label>
                                <input
                                    type="text"
                                    name="room_number"
                                    value={roomForm.room_number}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded focus:outline-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">ประเภท</label>
                                <select
                                    name="room_type"
                                    value={roomForm.room_type}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded focus:outline-blue-500"
                                >
                                    <option value={0}>พัดลม</option>
                                    <option value={1}>แอร์</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">ราคา (บาท)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={roomForm.price}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded focus:outline-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">สถานะ</label>
                                <select
                                    name="status"
                                    value={roomForm.status}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded focus:outline-blue-500"
                                >
                                    <option value={1}>ว่าง</option>
                                    <option value={0}>ไม่ว่าง</option>
                                    <option value={2}>ปรับปรุง</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    disabled={isRoomLoading}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    {isRoomLoading ? 'บันทึก...' : 'บันทึก'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Rent Modal */}
            {showRentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-xl font-bold mb-4">ทำสัญญาเช่า - ห้อง {currentRoomNumber}</h2>
                        <form onSubmit={handleRentSubmit}>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">ผู้เช่า</label>
                                <select
                                    name="customer_id"
                                    value={rentalForm.customer_id}
                                    onChange={handleRentalChange}
                                    className="w-full border p-2 rounded focus:outline-blue-500"
                                    required
                                >
                                    <option value="">-- เลือกผู้เช่า --</option>
                                    {customers.map(c => (
                                        <option key={c.customer_id} value={c.customer_id}>
                                            {c.first_name} {c.last_name} ({c.phone})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">เงินมัดจำ (บาท)</label>
                                <input
                                    type="number"
                                    name="deposit"
                                    value={rentalForm.deposit}
                                    onChange={handleRentalChange}
                                    className="w-full border p-2 rounded focus:outline-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">วันที่เริ่มสัญญา</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={rentalForm.start_date}
                                    onChange={handleRentalChange}
                                    className="w-full border p-2 rounded focus:outline-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">วันที่สิ้นสุดสัญญา</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={rentalForm.end_date}
                                    onChange={handleRentalChange}
                                    className="w-full border p-2 rounded focus:outline-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowRentModal(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    ยืนยัน/ทำสัญญา
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DormitoryDetail
