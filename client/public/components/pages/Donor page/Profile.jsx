import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import useToast from '../../../context/toast'

const Profile = () => {

    const setToast = useToast((state) => state.setToast)
    
    

    const [ userDetails, setUserDetails ] = useState(JSON.parse(sessionStorage.getItem('user')) || [])    
    const [edit, setEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [bloodType, setBloodType] = useState(userDetails.bloodType)
    const [location, setLocation] = useState(userDetails.location)
    const [status, setStatus] = useState(userDetails.status)

    async function postProfile() {
            
          setIsLoading(true)         
          try {
            const res = await axios.patch('/api/profile',
              {
                bloodType,
                location,
                status
              },{ withCredentials: true })
      
              const data = await res.data
              console.log(data);
              setEdit(!edit)
              setIsLoading(false)
              setToast('saved successfully')
                sessionStorage.setItem('user',JSON.stringify(data.data))
                setUserDetails(data.data)
                         
          } catch (error) {
            
            console.log(error);
            setIsLoading(false)
            setToast(error.message)
            
          }
        }

  return (

    
        <div className="profile-card">
            {
                
                edit?
                <div className="profile-info relative">
                        <h2>Edit Your Profile</h2> 
                        <span className='absolute right-[10px] top-[0px] cursor-pointer text-[20px]' onClick={() => setEdit(!edit)}>X</span>

                        <div className="profile-item">
                            <span className="profile-label">Blood Type:</span>
                            <select value={bloodType} onChange={(e) => setBloodType(e.target.value)} className='outline-0'>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        <div className="profile-item">
                            <span className="profile-label">Location:</span>
                            <input 
                                type="text" 
                                placeholder='edit location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className='outline-0'
                            />
                        </div>

                        <div className="profile-item">
                            <span className="profile-label">Status:</span>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className='outline-0'>
                                <option value="active">active</option>
                                <option value="unactive">in-ative</option>
                            </select>
                        </div>

                        <button className="btn-edit-profile" onClick={() => postProfile()}> {isLoading? 'loading...' : 'Save Changes'} </button>

                </div>
                
                :
            
                    
                <div className="profile-info">

                    <h2>Your Profile</h2>

                    
                    <div className="profile-item">
                        <span className="profile-label">Blood Type:</span>
                        <span className="blood-type-badge">{userDetails.bloodType}</span>
                    </div>

                    <div className="profile-item">
                        <span className="profile-label">Location:</span>
                        <span className="profile-value">🗺️ {userDetails.location}</span>
                    </div>

                    <div className="profile-item">
                        <span className="profile-label">Status:</span>
                        <span className="status-badge available"> {userDetails.status? 'Available' : 'Unavailable' } </span>
                    </div>
                    <button className="btn-edit-profile" onClick={() => setEdit(!edit)}>Edit Profile</button>
                </div>
                    
            
            }
                

        </div>
            

        
    )
}

export default Profile
