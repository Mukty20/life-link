import { create } from "zustand";

const useHospitalAuth = create((set) => ({
    authenticated:false,
    setAuthenticated: ((authenticatedValue) => set({ authenticated: authenticatedValue }))
}))

export default useHospitalAuth;