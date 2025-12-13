import { create } from 'zustand'
import api from '../lib/axios'

const useRentalStore = create((set) => ({
    rentals: [],
    isLoading: false,
    error: null,

    fetchRentals: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.get('/rental')
            set({ rentals: response.data.data, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    addRental: async (rentalData) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.post('/rental', rentalData)
            set((state) => ({
                rentals: [...state.rentals, response.data.data],
                isLoading: false
            }))
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
            throw error // Re-throw to handle in component
        }
    }
}))

export default useRentalStore
