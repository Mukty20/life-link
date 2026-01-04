import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from './isAuth'
import useUserType from './userType'
import useHospitalAuth from './hospitalAuth'
import useHospitalType from './hospitalType.'
import useRefresh from './refresh'

const ProtectedRoute = ({ children }) => {
    
    const setAuthenticated = useAuth((state) => state.setAuthenticated)
    const setUserType = useUserType((state) => state.setUserType)

    const refresh = useRefresh((state) => state.refresh)

    const setHospitalAuthenticated = useHospitalAuth((state) => state.setAuthenticated)
    const setHospitalType = useHospitalType((state) => state.setUserType)
    

    let [type] = useState(JSON.parse(sessionStorage.getItem('user')) || '')
    let [hospitalType] = useState(JSON.parse(sessionStorage.getItem('hospital')) || '')

    type = type === undefined? '' : type.userType
    hospitalType = hospitalType === undefined? '' : hospitalType.userType



    useEffect(() => {

        setUserType(type)
        setHospitalType(hospitalType)

        async function checkAuth() {
            try {
                const res = await axios.get('/api/check-auth',
                { 
                    withCredentials: true

                })

                const data = await res.data;

                console.log(res, 'user');
                
                
                
                if(data.authenticated) {
                    setAuthenticated(true)
                    sessionStorage.setItem('user',JSON.stringify(data.user))

                }else{
                    setAuthenticated(false)
                }
                
            } catch (error) {
                setAuthenticated(false)
                console.log(error, 'user');               

            } 
           
        }
        checkAuth()




        async function checkHospitalAuth() {
            try {
                const res = await axios.get('/api/check-hospital-auth',
                { 
                    withCredentials: true

                })

                const data = await res.data;

                console.log(res, 'hospital');
                
                
                
                if(data.authenticated) {
                    setHospitalAuthenticated(true)
                    sessionStorage.setItem('hospital',JSON.stringify(data.user))

                }else{
                    setHospitalAuthenticated(false)
                }
                
            } catch (error) {
                setHospitalAuthenticated(false)
                console.log(error, 'hospital');               

            } 
           
        }
        checkHospitalAuth()



    },[refresh])






    return children;

    
}

export default ProtectedRoute
