import { create } from "zustand";

const useTotalDonor = create((set) => ({
    totalDonor: [],
    setTotalDonor: ((TotalDonorValue) => set({ totalDonor: TotalDonorValue }))
}))

export default useTotalDonor;

