import React from 'react'
import useDonor from './donor'
import useUserDonor from './userDonor'
import axios from 'axios'
import { useEffect } from 'react'
import useError from '../../context/error'
import useLoading from '../../context/loading'
import useRefresh from '../../context/refresh'

const Donor = ({children}) => {

    const setDonor = useDonor((state) => state.setDonor)
    const setUserDonor = useUserDonor((state) => state.setUserDonor)

    
    const setError = useError((state) => state.setError)
    const setLoading = useLoading((state) => state.setLoading)
    const refresh = useRefresh((state) => state.refresh)
  
    async function fetchDonor() {
        setLoading(true)
        try {
        
            const res = await axios.get('/api/donation',{
                withCredentials: true
            })

            const data = await res.data
            
            console.log(data);

            setDonor(data.data || [])
            setError(false)
            setLoading(false)
            
            
        } catch (error) {
            
            console.log(error);
            setError(true)
            setLoading(false)
            
        }
    }


    async function fetchUserDonor() {
        setLoading(true)
        try {
        
            const res = await axios.get('/api/user-donation',{
                withCredentials: true
            })

            const data = await res.data
            
            console.log(data);

            setUserDonor(data.data || [])
            setError(false)
            setLoading(false)
            
            
        } catch (error) {
            

            console.log(error);
            setError(true)
            setLoading(false)
            
        }
    }




    useEffect(() => {
        fetchDonor()
        fetchUserDonor()
    },[refresh])


    return children;

}

export default Donor
