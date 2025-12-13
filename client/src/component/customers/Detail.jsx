import React from 'react'
import useCustomerStore from '../../store/customerStore';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const { customer, fetchCustomerById, isLoading, error } = useCustomerStore();
    const { id } = useParams();

    React.useEffect(() => {
        fetchCustomerById(id);
    }, [fetchCustomerById, id]);


    if (isLoading) return <div>Loading...</div>;
    if (!customer) return <div>ไม่พบข้อมูลลูกค้า</div>;

    return (
        <div className='p-6 bg-white shadow rounded-lg'>
            <h2 className='text-2xl font-bold mb-4'>ข้อมูลลูกค้า</h2>
            <div className='flex flex-col gap-2'>
                <p><strong>ชื่อ:</strong> {customer.first_name}</p>
                <p><strong>นามสกุล:</strong> {customer.last_name}</p>
                <p><strong>เบอร์โทรศัพท์:</strong> {customer.phone}</p>
                <p><strong>อีเมล์:</strong> {customer.email}</p>
                <p><strong>เลขบัตรประชาชน:</strong> {customer.id_card}</p>
                <p><strong>ไลน์:</strong> {customer.line_id}</p>
            </div>

            <hr className="my-6" />

            <h3 className="text-xl font-bold mb-4">ข้อมูลการเช่าพัก (Rent History)</h3>
            {customer.rentals && customer.rentals.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-2">หอพัก</th>
                                <th className="px-4 py-2">ห้อง</th>
                                <th className="px-4 py-2">วันที่เข้าพัก</th>
                                <th className="px-4 py-2">สิ้นสุดสัญญา</th>
                                <th className="px-4 py-2">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.rentals.map((rental) => {
                                const isActive = new Date(rental.end_date) > new Date();
                                return (
                                    <tr key={rental.rental_id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-4 py-2 font-medium text-gray-900">
                                            {rental.room?.dormitory?.dorm_name || '-'}
                                        </td>
                                        <td className="px-4 py-2">
                                            {rental.room?.room_number || '-'}
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(rental.start_date).toLocaleDateString('th-TH')}
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(rental.end_date).toLocaleDateString('th-TH')}
                                        </td>
                                        <td className="px-4 py-2">
                                            {isActive ?
                                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">กำลังเช่าอยู่</span> :
                                                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">หมดสัญญา</span>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">ไม่พบประวัติการเช่าพัก</p>
            )}
        </div>
    )
}

export default Detail