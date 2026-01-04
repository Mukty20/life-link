import { create } from "zustand";

const useAuth = create((set) => ({
    authenticated:false,
    setAuthenticated: ((authenticatedValue) => set({ authenticated: authenticatedValue }))
}))

export default useAuth;