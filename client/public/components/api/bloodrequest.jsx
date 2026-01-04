import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import useBloodRequest from './bloodrequest'
import useTotalBloodRequest from './totalBloodRequest'
import useTotalDonor from './totalDonor'

import useError from '../../context/error'
import useLoading from '../../context/loading'
import useRefresh from '../../context/refresh'


const Bloodrequest = ({children}) => {

    const setBloodRequest = useBloodRequest((state) => state.setBloodRequest)
    const setTotalBloodRequest = useTotalBloodRequest((state) => state.setTotalBloodRequest)
    const setTotalDonor = useTotalDonor((state) => state.setTotalDonor)

    const setError = useError((state) => state.setError)
    const setLoading = useLoading((state) => state.setLoading)
    const refresh = useRefresh((state) => state.refresh)

    async function fetchBloodRequest() {

        setLoading(true)
        
        try {

            const res = await axios.get('/api/blood-request',{
                withCredentials: true
            })

            const data = await res.data
            
            console.log(data);

            setBloodRequest(data.data || [])
            setError(false)
            setLoading(false)
            
            
        } catch (error) {
            
            console.log(error);
            setError(true)
            setLoading(false)
            
        }
    }




    async function fetchTotalBloodRequest() {

        setLoading(true)
        
        try {

            const res = await axios.get('/api/total-blood-request',{
                withCredentials: true
            })

            const data = await res.data
            
            console.log(data,'total blood');

            setTotalBloodRequest(data.data || [])
            setError(false)
            setLoading(false)
            
            
        } catch (error) {
            
            console.log(error);
            setError(true)
            setLoading(false)
            
        }
    }




    async function fetchBloodTotalDonors() {

        setLoading(true)
        
        try {

            const res = await axios.get('/api/total-donor',{
                withCredentials: true
            })

            const data = await res.data
            
            console.log(data,'total donors');

            setTotalDonor(data.data || [])
            setError(false)
            setLoading(false)
            
            
        } catch (error) {
            
            console.log(error);
            setError(true)
            setLoading(false)
            
        }
    }


    
    useEffect(() => {
        fetchBloodRequest()
        fetchTotalBloodRequest()
        fetchBloodTotalDonors()
    },[refresh])


    return children;
  
}

export default Bloodrequest
