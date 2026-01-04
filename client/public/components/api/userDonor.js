import { create } from "zustand";

const useUserDonor = create((set) => ({
    donor: [],
    setUserDonor: ((donorValue) => set({ donor: donorValue }))
}))

export default useUserDonor;

