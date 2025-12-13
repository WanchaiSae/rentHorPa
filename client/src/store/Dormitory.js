import { create } from 'zustand'
import api from '../lib/axios'

const useDormitoryStore = create((set) => ({
    dormitories: [],
    dormitory: null,
    isLoading: false,
    error: null,

    fetchDormitories: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.get('/dormitories')
            set({ dormitories: response.data.data || [], isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    fetchDormitoryById: async (id) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.get(`/dormitories/${id}`)
            set({ dormitory: response.data.data, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    addDormitory: async (dormitoryData) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.post('/dormitories', dormitoryData)
            set((state) => ({
                dormitories: [...state.dormitories, response.data.data],
                isLoading: false,
            }))
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    updateDormitory: async (id, dormitoryData) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.put(`/dormitories/${id}`, dormitoryData)
            set((state) => ({
                dormitories: state.dormitories.map((d) =>
                    d.dorm_id === Number(id) ? response.data.data : d
                ),
                isLoading: false,
            }))
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    deleteDormitory: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await api.delete(`/dormitories/${id}`)
            set((state) => ({
                dormitories: state.dormitories.filter((d) => d.dorm_id !== Number(id)),
                isLoading: false,
            }))
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },
}))

export default useDormitoryStore
