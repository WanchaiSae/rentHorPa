import { create } from 'zustand';

const useCustomerStore = create((set) => ({
    customers: [],
    isLoading: false,
    error: null,

    fetchCustomers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('http://localhost:5000/api/customers');
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const result = await response.json();
            // Assuming result.data matches the structure from previous responses
            set({ customers: result.data || [], isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    deleteCustomer: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }
            // Remove the deleted customer from the state
            set((state) => ({
                customers: state.customers.filter((c) => c.customer_id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useCustomerStore;
