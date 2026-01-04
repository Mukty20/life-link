import { create } from "zustand";

const useMatchedDonor = create((set) => ({
    MatchedDonors: [],
    setMatchedDonor: ((MatchedDonorValue) => set({ MatchedDonors: MatchedDonorValue }))
}))

export default useMatchedDonor;
