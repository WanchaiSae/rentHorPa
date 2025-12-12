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
        </div>
    )
}

export default Detail