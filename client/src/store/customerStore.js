import { create } from 'zustand';
import api from '../lib/axios';

const useCustomerStore = create((set) => ({
    customers: [],
    isLoading: false,
    error: null,

    fetchCustomers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/customers');
            set({ customers: response.data.data || [], isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false });
        }
    },

    deleteCustomer: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/customers/${id}`);
            // Remove the deleted customer from the state
            set((state) => ({
                customers: state.customers.filter((c) => c.customer_id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false });
        }
    },
}));

export default useCustomerStore;
