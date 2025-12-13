import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useBillStore from '../../store/billStore'
import useRentalStore from '../../store/rentalStore'
import useDormitoryStore from '../../store/Dormitory'

const CreateBill = () => {
    const navigate = useNavigate()
    const { createBill, isLoading } = useBillStore()
    const { rentals, fetchRentals } = useRentalStore()
    const { dormitories, fetchDormitories } = useDormitoryStore()

    const [selectedDormId, setSelectedDormId] = useState('')
    const [filteredRentals, setFilteredRentals] = useState([])

    const [formData, setFormData] = useState({
        rental_id: '',
        billing_period: new Date().toISOString().slice(0, 10),
        due_date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().slice(0, 10), // Due in 5 days
        water_usage: 0,
        water_rate: 18, // Default rate
        electricity_start: 0,
        electricity_end: 0,
        electricity_rate: 7, // Default rate
        other_charge: 0
    })

    useEffect(() => {
        fetchRentals()
        fetchDormitories()
    }, [fetchRentals, fetchDormitories])

    // Filter rentals when dormitory changes
    useEffect(() => {
        if (selectedDormId) {
            // Assuming rental object has room.dorm_id available via associations. 
            // We might need to check if the backend returns this nested structure. 
            // Based on previous files, rental -> room -> dormitory seems plausible.
            // If rental.room.dorm_id is not directly available, we might need a backend update or ensure fetchRentals returns deep structure.
            // Let's assume nested structure is: rental.room.dorm_id
            const filtered = rentals.filter(r => r.room?.dorm_id === Number(selectedDormId))
            setFilteredRentals(filtered)
        } else {
            setFilteredRentals([])
        }
        setFormData(prev => ({ ...prev, rental_id: '' })) // Reset rental selection
    }, [selectedDormId, rentals])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const calculatePreview = () => {
        const water = (Number(formData.water_usage) || 0) * (Number(formData.water_rate) || 0)
        const elec = ((Number(formData.electricity_end) || 0) - (Number(formData.electricity_start) || 0)) * (Number(formData.electricity_rate) || 0)
        return water + elec + (Number(formData.other_charge) || 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createBill(formData)
            alert('สร้างบิลเรียบร้อยแล้ว')
            navigate('/bills')
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการสร้างบิล')
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">ออกบิลเรียกเก็บเงิน</h1>
            <hr className="border-gray-200 my-4" />

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Dormitory Selection */}
                    <div className="md:col-span-2">
                        <label className="block font-bold text-gray-700 mb-2">เลือกหอพัก</label>
                        <select
                            value={selectedDormId}
                            onChange={(e) => setSelectedDormId(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">-- เลือกหอพัก --</option>
                            {dormitories.map(dorm => (
                                <option key={dorm.dorm_id} value={dorm.dorm_id}>
                                    {dorm.dorm_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Rental/Room Selection */}
                    <div className="md:col-span-2">
                        <label className="block font-bold text-gray-700 mb-2">เลือกห้อง/ผู้เช่า</label>
                        <select
                            name="rental_id"
                            value={formData.rental_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            required
                            disabled={!selectedDormId}
                        >
                            <option value="">-- เลือกห้อง --</option>
                            {filteredRentals.length > 0 ? (
                                filteredRentals.map(r => (
                                    <option key={r.rental_id} value={r.rental_id}>
                                        ห้อง {r.room?.room_number} - {r.customer?.first_name} {r.customer?.last_name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>ไม่มีผู้เช่าในหอพักนี้</option>
                            )}
                        </select>
                    </div>

                    {/* Room Price Display */}
                    <div className="md:col-span-2">
                        <div className="bg-gray-50 border p-4 rounded flex justify-between items-center">
                            <span className="font-bold text-gray-700">ค่าห้อง (ดึงจากข้อมูลห้องพัก):</span>
                            <span className="text-xl font-bold text-gray-800">
                                {formData.rental_id
                                    ? Number(rentals.find(r => r.rental_id === Number(formData.rental_id))?.room?.price || 0).toLocaleString()
                                    : 0} บาท
                            </span>
                        </div>
                    </div>

                    {/* Dates */}
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">รอบบิล (วันที่)</label>
                        <input
                            type="date"
                            name="billing_period"
                            value={formData.billing_period}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">วันครบกำหนดจ่าย</label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Water */}
                    <div className="border p-4 rounded bg-blue-50">
                        <h3 className="font-bold mb-2 text-blue-800">ค่าน้ำประปา</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600">หน่วยน้ำที่ใช้</label>
                                <input
                                    type="number"
                                    name="water_usage"
                                    value={formData.water_usage}
                                    onChange={handleChange}
                                    className="w-full border p-1 rounded"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">ราคาต่อหน่วย</label>
                                <input
                                    type="number"
                                    name="water_rate"
                                    value={formData.water_rate}
                                    onChange={handleChange}
                                    className="w-full border p-1 rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Electricity */}
                    <div className="border p-4 rounded bg-yellow-50">
                        <h3 className="font-bold mb-2 text-yellow-800">ค่าไฟฟ้า</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600">เลขมิเตอร์เริ่มต้น</label>
                                <input
                                    type="number"
                                    name="electricity_start"
                                    value={formData.electricity_start}
                                    onChange={handleChange}
                                    className="w-full border p-1 rounded"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">เลขมิเตอร์ล่าสุด</label>
                                <input
                                    type="number"
                                    name="electricity_end"
                                    value={formData.electricity_end}
                                    onChange={handleChange}
                                    className="w-full border p-1 rounded"
                                    min="0"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm text-gray-600">ราคาต่อหน่วย</label>
                                <input
                                    type="number"
                                    name="electricity_rate"
                                    value={formData.electricity_rate}
                                    onChange={handleChange}
                                    className="w-full border p-1 rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Other */}
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">ค่าอื่นๆ (บาท)</label>
                        <input
                            type="number"
                            name="other_charge"
                            value={formData.other_charge}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            min="0"
                        />
                    </div>

                    {/* Summary */}
                    <div className="md:col-span-2 text-right text-xl font-bold p-4 bg-gray-100 rounded border-2 border-green-500">
                        ยอดรวมสุทธิ (รวมค่าห้อง): <span className="text-green-600 text-2xl">
                            {(calculatePreview() + (formData.rental_id
                                ? Number(rentals.find(r => r.rental_id === Number(formData.rental_id))?.room?.price || 0)
                                : 0)).toLocaleString()}
                        </span> บาท
                    </div>

                </div>

                <div className="mt-8 flex justify-end space-x-4">
                    <Link to="/bills" className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
                        ยกเลิก
                    </Link>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow-lg"
                    >
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึกบิล'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateBill
