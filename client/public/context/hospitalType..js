import { create } from "zustand";

const useHospitalType = create((set) => ({
    userType:'',
    setUserType: ((userTypeValue) => set({ userType: userTypeValue }))
}))

export default useHospitalType;