import { create } from 'zustand'
import api from '../lib/axios'

const useRoomStore = create((set) => ({
    rooms: [],
    isLoading: false,
    error: null,

    fetchRoomsByDormId: async (dormId) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.get(`/rooms/dormitory/${dormId}`)
            set({ rooms: response.data.data, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    addRoom: async (roomData) => {
        set({ isLoading: true, error: null })
        try {
            await api.post('/rooms', roomData)
            // Refresh logic or append to state would go here, 
            // but usually fetching again by dormId is safer for this list view
            set({ isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    updateRoom: async (id, roomData) => {
        set({ isLoading: true, error: null })
        try {
            await api.put(`/rooms/${id}`, roomData)
            set({ isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    },

    deleteRoom: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await api.delete(`/rooms/${id}`)
            set((state) => ({
                rooms: state.rooms.filter(r => r.room_id !== id),
                isLoading: false
            }))
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false })
        }
    }
}))

export default useRoomStore
