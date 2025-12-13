import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import useBillStore from '../../store/billStore'

const BillDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { bill, fetchBillById, updateBillStatus, isLoading } = useBillStore()

    useEffect(() => {
        fetchBillById(id)
    }, [fetchBillById, id])

    const handleMarkAsPaid = async () => {
        if (window.confirm('ยืนยันว่าบิลนี้ชำระเงินเรียบร้อยแล้ว?')) {
            await updateBillStatus(id, 1) // 1 = Paid
            fetchBillById(id) // Refresh
        }
    }

    const handlePrint = () => {
        window.print()
    }

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading...</div>
    if (!bill) return <div className="p-8 text-center text-red-500">ไม่พบข้อมูลบิล</div>

    return (
        <div className="p-6">
            {/* Print Styles */}
            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #invoice-content, #invoice-content * {
                            visibility: visible;
                        }
                        #invoice-content {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100vh;
                            margin: 0;
                            padding: 20px;
                            background: white;
                            box-shadow: none;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                `}
            </style>

            <h1 className="text-2xl font-bold mb-4 no-print">รายละเอียดบิล #{bill.bill_id}</h1>
            <hr className="border-gray-200 my-4 no-print" />

            <div id="invoice-content" className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto border print:border-0 print:shadow-none">

                {/* Print Header - Visible only on Print or stylized differently if needed */}
                <div className="hidden print:block text-center mb-6">
                    <h1 className="text-2xl font-bold">ใบแจ้งหนี้ / Invoice</h1>
                    <p className="text-gray-600">หอพักของคุณ (RentHorPa)</p>
                </div>

                {/* Header / Status */}
                <div className="bg-gray-50 p-6 flex justify-between items-center border-b print:bg-white print:border-b-2 print:p-0 print:mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            ห้อง {bill.rental?.room?.room_number || '-'}
                        </h2>
                        <p className="text-gray-600">
                            ผู้เช่า: {bill.rental?.customer?.first_name} {bill.rental?.customer?.last_name}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${bill.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            } print:border print:border-gray-500 print:bg-transparent print:text-black`}>
                            {bill.status === 1 ? 'ชำระแล้ว' : 'รอชำระเงิน'}
                        </span>
                        <p className="text-sm text-gray-500 mt-2 print:text-black">
                            ครบกำหนด: {new Date(bill.due_date).toLocaleDateString('th-TH')}
                        </p>
                    </div>
                </div>

                {/* Bill Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 print:p-0 print:gap-4 print:block">
                    {/* Left Column: Charges */}
                    <div className="print:mb-4">
                        <h3 className="font-bold text-lg mb-4 text-gray-700 print:text-black">รายการค่าใช้จ่าย</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 text-gray-600 print:text-black">ค่าเช่าห้อง</td>
                                    <td className="py-2 text-right font-semibold">
                                        {Number(bill.rental?.room?.price || 0).toLocaleString()} บ.
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 text-gray-600 print:text-black">
                                        ค่าน้ำ ({bill.water_usage} หน่วย x {bill.water_rate})
                                    </td>
                                    <td className="py-2 text-right font-semibold">
                                        {Number(bill.water_charge).toLocaleString()} บ.
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 text-gray-600 print:text-black">
                                        ค่าไฟ ({bill.electricity_end - bill.electricity_start} หน่วย x {bill.electricity_rate})
                                    </td>
                                    <td className="py-2 text-right font-semibold">
                                        {Number(bill.electricity_charge).toLocaleString()} บ.
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 text-gray-600 print:text-black">ค่าอื่นๆ</td>
                                    <td className="py-2 text-right font-semibold">
                                        {Number(bill.other_charge).toLocaleString()} บ.
                                    </td>
                                </tr>
                                <tr className="bg-gray-100 print:bg-gray-200">
                                    <td className="py-3 pl-2 font-bold text-gray-800">ยอดรวมทั้งสิ้น</td>
                                    <td className="py-3 text-right font-bold text-blue-600 text-lg print:text-black">
                                        {Number(bill.total_amount).toLocaleString()} บ.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Right Column: Meter & Info */}
                    <div className="print:flex print:justify-between print:mt-4 print:border-t print:pt-4">
                        <div className="print:w-1/2">
                            <h3 className="font-bold text-lg mb-4 text-gray-700 print:hidden">รายละเอียดมิเตอร์</h3>
                            <div className="bg-blue-50 p-4 rounded mb-4 print:bg-white print:p-0 print:mb-2">
                                <p className="text-sm text-gray-700 print:text-black">
                                    <span className="font-semibold">มิเตอร์น้ำ:</span> ใช้ไป {bill.water_usage} หน่วย
                                </p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded print:bg-white print:p-0">
                                <p className="text-sm text-gray-700 mb-1 print:text-black">
                                    <span className="font-semibold">มิเตอร์ไฟเริ่มต้น:</span> {bill.electricity_start}
                                </p>
                                <p className="text-sm text-gray-700 print:text-black">
                                    <span className="font-semibold">มิเตอร์ไฟล่าสุด:</span> {bill.electricity_end}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 print:text-black">
                                    (ใช้ไป {Number(bill.electricity_end) - Number(bill.electricity_start)} หน่วย)
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 border-t pt-4 print:border-t-0 print:mt-0 print:pt-0 print:w-1/2 print:text-right">
                            <h3 className="font-bold text-gray-700 mb-2 no-print">ประวัติการชำระเงิน</h3>
                            {bill.payments && bill.payments.length > 0 ? (
                                <ul className="text-sm no-print">
                                    {bill.payments.map(p => (
                                        <li key={p.payment_id} className="flex justify-between text-green-600 mb-1">
                                            <span>ชำระเมื่อ {new Date(p.createdAt).toLocaleDateString('th-TH')}</span>
                                            <span>{Number(p.amount).toLocaleString()} บ.</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-400 no-print">- ยังไม่มีการชำระเงิน -</p>
                            )}

                            {/* Signature Area for Print */}
                            <div className="hidden print:block mt-8 text-center px-4">
                                <div className="border-b border-black w-48 mx-auto mb-2"></div>
                                <p className="text-sm">ผู้รับเงิน / Admin</p>
                                <p className="text-xs mt-1">วันที่: {new Date().toLocaleDateString('th-TH')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 border-t flex justify-end space-x-3 no-print">
                    <Link
                        to="/bills"
                        className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                    >
                        ย้อนกลับ
                    </Link>
                    {bill.status === 0 && (
                        <button
                            onClick={handleMarkAsPaid}
                            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                        >
                            แจ้งโอน / ชำระเงินแล้ว
                        </button>
                    )}
                    <button
                        onClick={handlePrint}
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                    >
                        🖨️ พิมพ์ใบแจ้งหนี้
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BillDetail
