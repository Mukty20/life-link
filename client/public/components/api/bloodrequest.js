import { create } from "zustand";

const useBloodRequest = create((set) => ({
    bloodRequest: [],
    setBloodRequest: ((BloodRequestValue) => set({ bloodRequest: BloodRequestValue }))
}))

export default useBloodRequest;
