import React, { useEffect } from 'react'
import useDashboardStore from '../store/dashboardStore'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import moment from 'moment'
import 'moment/locale/th'

moment.locale('th')

const Dashboard = () => {
    const { stats, fetchDashboardStats, isLoading } = useDashboardStore()

    useEffect(() => {
        fetchDashboardStats()
    }, [fetchDashboardStats])

    // Format data for Recharts
    // stats.yearlyRevenue needs to be mapped to full 12 months for better graph
    const chartData = Array.from({ length: 12 }, (_, i) => {
        const monthNum = i + 1
        const found = stats.yearlyRevenue?.find(d => d.month === monthNum)
        return {
            name: moment().month(i).format('MMM'), // Jan, Feb, etc.
            total: found ? Number(found.total) : 0
        }
    })

    const handleYearChange = (e) => {
        const year = e.target.value
        fetchDashboardStats(year)
    }

    if (isLoading) return <div className="p-8 text-center text-gray-500">กำลังโหลดข้อมูล...</div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard ภาพรวมหอพัก</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">ลูกค้าทั้งหมดที่เคยเข้าพัก</h3>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalCustomers} คน</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">ลูกค้าที่พักอยู่ปัจจุบัน</h3>
                    <p className="text-3xl font-bold text-gray-800">{stats.activeTenants} คน</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
                    <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">ห้องว่าง</h3>
                    <p className="text-3xl font-bold text-gray-800">{stats.vacantRooms} ห้อง</p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-700">รายรับรวมรายเดือน (ปี {Number(stats.selectedYear) + 543})</h2>
                    <select
                        value={stats.selectedYear}
                        onChange={handleYearChange}
                        className="border border-gray-300 rounded p-1 text-sm"
                    >
                        {stats.availableYears && stats.availableYears.length > 0 ? (
                            stats.availableYears.map(year => (
                                <option key={year} value={year}>{Number(year) + 543}</option>
                            ))
                        ) : (
                            <option value={new Date().getFullYear()}>{new Date().getFullYear() + 543}</option>
                        )}
                    </select>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value.toLocaleString()} บ.`} />
                            <Legend />
                            <Bar dataKey="total" name="รายรับ (บาท)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-bold text-gray-800">การเข้าพักล่าสุด</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">วันที่เริ่มสัญญา</th>
                                <th className="px-6 py-3">ห้อง</th>
                                <th className="px-6 py-3">ผู้เช่า</th>
                                <th className="px-6 py-3">วันสิ้นสุดสัญญา</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentRentals && stats.recentRentals.length > 0 ? (
                                stats.recentRentals.map((rental) => (
                                    <tr key={rental.rental_id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {moment(rental.start_date).format('DD MMM YYYY')}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">
                                            {rental.room?.room_number || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {rental.customer?.first_name} {rental.customer?.last_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {moment(rental.end_date).format('DD MMM YYYY')}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center">ไม่พบข้อมูลการเข้าพักล่าสุด</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard