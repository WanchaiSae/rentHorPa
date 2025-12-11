import React from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";

import useCustomerStore from '../../store/customerStore';

const Customer = () => {
	// State
	const { customers, fetchCustomers, deleteCustomer } = useCustomerStore();
	const [searchTerm, setSearchTerm] = React.useState("");

	// Fetch Data
	React.useEffect(() => {
		fetchCustomers();
	}, [fetchCustomers]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredCustomers = customers.filter((customer) =>
		customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		customer.phone.includes(searchTerm)
	);

	return (
		<div className='p-5'>
			<h1 className='text-2xl font-bold'>จัดการลูกค้า</h1>
			<hr className='border-gray-400 mt-5 mb-5' />
			{/* Searching  */}
			<form className='mb-5'>
				<input
					type="text"
					placeholder='ช่องค้นหา (ชื่อ, นามสกุล, เบอร์โทรศัพท์)'
					className='w-full p-2 border border-gray-400 rounded'
					value={searchTerm}
					onChange={handleSearch}
				/>
			</form>

			<div className="overflow-x-auto shadow-md rounded-lg mt-5">
				<table className="w-full text-left text-gray-700 border-collapse">
					<thead className="bg-gray-900 text-white font-medium uppercase">
						<tr>
							<th className="py-3 px-6 border-b border-gray-700">ลำดับ</th>
							<th className="py-3 px-6 border-b border-gray-700">ชื่อ</th>
							<th className="py-3 px-6 border-b border-gray-700">นามสกุล</th>
							<th className="py-3 px-6 border-b border-gray-700">เบอร์โทรศัพท์</th>
							<th className="py-3 px-6 border-b border-gray-700">จัดการ</th>
						</tr>
					</thead>
					<tbody>
						{filteredCustomers.length > 0 ? (
							filteredCustomers.map((customer, index) => (
								<tr key={customer.customer_id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
									<td className="py-4 px-6">{index + 1}</td>
									<td className="py-4 px-6">{customer.first_name}</td>
									<td className="py-4 px-6">{customer.last_name}</td>
									<td className="py-4 px-6">{customer.phone}</td>
									<td className="py-4 px-6 flex gap-3">
										<button className="text-yellow-500 hover:text-yellow-700 text-lg transition duration-200 cursor-pointer">
											<FaEdit />
										</button>
										<button
											className="text-red-500 hover:text-red-700 text-lg transition duration-200 cursor-pointer"
											onClick={() => {
												if (window.confirm('คุณต้องการลบข้อมูลลูกค้านี้ใช่หรือไม่?')) {
													deleteCustomer(customer.customer_id);
												}
											}}
										>
											<FaTrash />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="py-4 text-center text-gray-500">ไม่พบข้อมูลที่ค้นหา</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>


		</div>
	)
}

export default Customer