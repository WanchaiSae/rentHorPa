import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useDormitoryStore from '../../store/Dormitory'

const EditDormitory = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { dormitory, fetchDormitoryById, updateDormitory, isLoading } = useDormitoryStore()

    const [formData, setFormData] = useState({
        dorm_name: '',
        address: '',
        map: ''
    })

    useEffect(() => {
        fetchDormitoryById(id)
    }, [fetchDormitoryById, id])

    useEffect(() => {
        if (dormitory) {
            setFormData({
                dorm_name: dormitory.dorm_name || dormitory.name || '',
                address: dormitory.address || '',
                map: dormitory.map || ''
            })
        }
    }, [dormitory])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateDormitory(id, formData) // formData will now have dorm_name
        navigate('/dormitory')
    }

    if (isLoading && !dormitory) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">แก้ไขข้อมูลหอพัก</h1>
            <hr className="border-gray-200 my-4" />

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-2xl">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">ชื่อหอพัก</label>
                        <input
                            type="text"
                            name="dorm_name"
                            value={formData.dorm_name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">ที่อยู่</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            rows="3"
                        />
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700 mb-2">แผนที่ (URL/Description)</label>
                        <input
                            type="text"
                            name="map"
                            value={formData.map}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="mt-6 flex space-x-3">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                    </button>
                    <Link
                        to="/dormitory"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        ยกเลิก
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default EditDormitory
