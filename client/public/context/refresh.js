import { create } from "zustand";

const useRefresh = create((set) => ({
    refresh:false,
    setRefresh: ((RefreshValue) => set({ refresh: RefreshValue }))
}))

export default useRefresh;

