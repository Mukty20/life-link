import { create } from "zustand";

const useError = create((set) => ({
    error:false,
    setError: ((ErrorValue) => set({ error: ErrorValue }))
}))

export default useError;