import { create } from "zustand";

const useUserType = create((set) => ({
    userType:'',
    setUserType: ((userTypeValue) => set({ userType: userTypeValue }))
}))

export default useUserType;