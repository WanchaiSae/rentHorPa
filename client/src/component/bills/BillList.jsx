import React, { useEffect } from 'react'
import useBillStore from '../../store/billStore'
import { Link } from 'react-router-dom'
import moment from 'moment'

const BillList = () => {
    const { bills, fetchBills, deleteBill, updateBillStatus } = useBillStore()

    useEffect(() => {
        fetchBills()
    }, [fetchBills])

    const handleDelete = (id) => {
        if (window.confirm('คุณต้องการลบบิลนี้ใช่หรือไม่?')) {
            deleteBill(id)
        }
    }

    const markAsPaid = (id) => {
        if (window.confirm('ยืนยันว่าบิลนี้ชำระแล้ว?')) {
            updateBillStatus(id, 1)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">จัดการบิล & ค่าเช่า</h1>
            <hr className="border-gray-200 my-4" />

            <div className="mb-4">
                <Link to="/bills/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    + สร้างบิลใหม่
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">เลขที่บิล</th>
                            <th className="py-2 px-4 border-b">ห้อง</th>
                            <th className="py-2 px-4 border-b">ผู้เช่า</th>
                            <th className="py-2 px-4 border-b">รอบบิล</th>
                            <th className="py-2 px-4 border-b text-right">จำนวนเงิน</th>
                            <th className="py-2 px-4 border-b text-center">สถานะ</th>
                            <th className="py-2 px-4 border-b text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.length > 0 ? (
                            bills.map((bill) => (
                                <tr key={bill.bill_id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-center">{bill.bill_id}</td>
                                    <td className="py-2 px-4 border-b text-center">{bill.rental?.room?.room_number || '-'}</td>
                                    <td className="py-2 px-4 border-b">{bill.rental?.customer?.first_name} {bill.rental?.customer?.last_name}</td>
                                    <td className="py-2 px-4 border-b text-center">{moment(bill.billing_period).format('MMM YYYY')}</td>
                                    <td className="py-2 px-4 border-b text-right">{bill.total_amount.toLocaleString()} บ.</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {bill.status === 1 ? (
                                            <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">จ่ายแล้ว</span>
                                        ) : (
                                            <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs">ค้างชำระ</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center space-x-2">
                                        <Link
                                            to={`/bills/${bill.bill_id}`}
                                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                        >
                                            ดูรายละเอียด
                                        </Link>
                                        {bill.status === 0 && (
                                            <button
                                                onClick={() => markAsPaid(bill.bill_id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                                            >
                                                แจ้งโอน
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(bill.bill_id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                        >
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-4 text-center text-gray-500">ไม่พบรายการบิล</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BillList
