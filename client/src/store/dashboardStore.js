import { create } from 'zustand'
import api from '../lib/axios'

const useDashboardStore = create((set) => ({
    stats: {
        totalCustomers: 0,
        activeTenants: 0,
        vacantRooms: 0,
        yearlyRevenue: [],
        availableYears: [],
        selectedYear: new Date().getFullYear(),
        recentRentals: []
    },
    isLoading: false,
    error: null,

    fetchDashboardStats: async (year) => {
        set({ isLoading: true, error: null })
        try {
            const url = year ? `/dashboard?year=${year}` : '/dashboard';
            const response = await api.get(url)
            set({ stats: response.data.data, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    }
}))

export default useDashboardStore
