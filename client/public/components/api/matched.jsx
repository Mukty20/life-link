import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import useMatchedDonor from './matched'
import useError from '../../context/error'
import useLoading from '../../context/loading'
import useRefresh from '../../context/refresh'

const Matched = ({ children }) => {

    const setMatchedDonor = useMatchedDonor((state) => state.setMatchedDonor)
    const setError = useError((state) => state.setError)
    const setLoading = useLoading((state) => state.setLoading)
    const refresh = useRefresh((state) => state.refresh)
  
    async function fetchMatchedDonor() {
        setLoading(true)
        
        try {
            
            const res = await axios.get('/api/matched-donor',{
                withCredentials: true
            })

            const data = await res.data

            setMatchedDonor(data.data || [])
            console.log(data);
            setError(false)
            setLoading(false)
            


        } catch (error) {
            
            console.log(error);
            setError(true)
            setLoading(false)

        }
        
    }


    useEffect(() => {
        fetchMatchedDonor()
    },[refresh])


    return children

}

export default Matched
