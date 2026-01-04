import { create } from "zustand";

const useTotalBloodRequest = create((set) => ({
    totalBloodRequest: [],
    setTotalBloodRequest: ((TotalBloodRequestValue) => set({ totalBloodRequest: TotalBloodRequestValue }))
}))

export default useTotalBloodRequest;

