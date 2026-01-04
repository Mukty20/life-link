import { create } from "zustand";

const useDonor = create((set) => ({
    donor: [],
    setDonor: ((donorValue) => set({ donor: donorValue }))
}))

export default useDonor;

