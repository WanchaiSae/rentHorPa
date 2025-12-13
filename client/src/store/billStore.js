import { create } from 'zustand'
import api from '../lib/axios'

const useBillStore = create((set) => ({
    bills: [],
    bill: null,
    isLoading: false,
    error: null,

    fetchBills: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.get('/bills')
            set({ bills: response.data.data, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    fetchBillById: async (id) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.get(`/bills/${id}`)
            set({ bill: response.data.data, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    createBill: async (billData) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.post('/bills', billData)
            set((state) => ({
                bills: [...state.bills, response.data.data],
                isLoading: false
            }))
            return response.data; // Return for navigation or alerts
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
            throw error;
        }
    },

    deleteBill: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await api.delete(`/bills/${id}`)
            set((state) => ({
                bills: state.bills.filter(b => b.bill_id !== id),
                isLoading: false
            }))
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    updateBillStatus: async (id, status) => {
        set({ isLoading: true, error: null })
        try {
            await api.put(`/bills/${id}`, { status })
            set((state) => ({
                bills: state.bills.map(b => b.bill_id === id ? { ...b, status } : b),
                isLoading: false
            }))
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    }
}))

export default useBillStore
