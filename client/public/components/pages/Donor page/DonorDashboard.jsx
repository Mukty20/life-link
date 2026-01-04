import { MdLockPerson } from "react-icons/md"; 
import { BiLoader } from "react-icons/bi"; 
import { FiWifiOff } from "react-icons/fi"; 
import { useState } from 'react'
import Toast from "../../../../src/assets/toast";
import axios from 'axios'
import useAuth from '../../../context/isAuth'
import Profile from './Profile'
import useToast from "../../../context/toast";

import useUserDonor from '../../api/userDonor'
import useBloodRequest from '../../api/bloodrequest'
import useTotalBloodRequest from "../../api/totalBloodRequest";


import useError from '../../../context/error'
import useLoading from "../../../context/loading";
import useRefresh from "../../../context/refresh";




function DonorDashboard({ onBack, onOpenDonationForm }) {


  const setToast = useToast((state) => state.setToast)

 

  const authenticated = useAuth((state) => state.authenticated)

  const error = useError((state) => state.error)
  const loading = useLoading((state) => state.loading)
  const refresh = useRefresh((state) => state.refresh)
  const setRefresh = useRefresh((state) => state.setRefresh)

  let donationHistory = useUserDonor((state) => state.donor)
  let bloodRequests = useBloodRequest((state) => state.bloodRequest)
  let totalBloodRequests = useTotalBloodRequest((state) => state.totalBloodRequest)

  totalBloodRequests = bloodRequests.filter((x) => x.status === 'pending')

  const opportunities = totalBloodRequests


  

  // pop states
  const [activeView, setActiveView] = useState('overview')
  const [pop, setPop] = useState(false)
  const [popIndex, setPopIndex] = useState(0)



  // popup for more details
  function setPopupFunc(i) {
     setPop(true)
     setPopIndex(i)
  }


  // add to donor post request function
  async function addToDonors(reqId, hospitalId) {

    setRefresh(!refresh)
    
    try {

      const res = await axios.post('/api/add-to-donor',
        {
          reqId, hospitalId
        },
        {
          withCredentials: true
        }
      )

      const data = res.data
      setToast(data.message)
      console.log(data);
      
      
    } catch (error) {

      console.log(error);
      setToast(error.message)
      
    }

  }


 

  const HeaderProperties = [
  {
    icon: '🩸',
    stat: !donationHistory.length? 0 : donationHistory.length,
    text: 'Total donation'
  },

  {
    icon: '📅',
    stat: new Date(!donationHistory[0]? 'make your first donation' : donationHistory[0].createdAt).toDateString(),
    text: 'last donation'
  },

  {
    icon:'✅' ,
    stat: !donationHistory[0]? '' : donationHistory[0].availability,
    text: 'Next Eligible'
  },

  {
    icon:'🏥' ,
    stat: totalBloodRequests.length,
    text: 'Donatiion oportunities'
  },
  
]

  

  //  function for posting blood request
  if(loading) return (
    <div className='fixed top-[40%]'>
      <div className="w-[fit-content] place-self-center animate-spin text-[90px]"> <BiLoader /></div>
    </div>
  )





  // function for updating blood request status
  if(error) return (
    <div className='fixed top-[40%] text-center place-items-center flex flex-col gap-[1rem]'>
      <div className="text-[90px] animate-pulse place-self-center"> <FiWifiOff /> </div>
      <div className='text-[25px]'>error check internet connection</div>
      <div className="flex flex-row gap-[1rem]">
        <button className="rounded-3xl bg-[#131212] text-white cursor-pointer" style={{padding:'.5rem 2rem'}}  onClick={onBack}>back</button>
        <button className="rounded-3xl bg-[#ce1919] text-white cursor-pointer" style={{padding:'.5rem 2rem'}} onClick={() => setRefresh(!refresh)}>refresh</button>
      </div>
    </div>
  )




  // function for deleting blood request
  if(!authenticated) return (
    <div className='fixed top-[40%] place-items-center flex flex-col gap-[.5rem]'>
      <div className="w-[120px] h-[120px] rounded-full bg-white place-content-center place-items-center text-[60px]"> <MdLockPerson /> </div>
      <h2 className="text-[red]">Unauthorized Access Denied To Donor Dashboard</h2>
      <button className="rounded-3xl bg-[#131212] text-white cursor-pointer" style={{padding:'.5rem 2rem'}}  onClick={onBack}>Login / signup</button>
    </div>
  )



 
  return (
    <div className="dashboard-container">


      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <button className="btn-back" onClick={onBack}>← Back to Home</button>
          <h1>Donor Dashboard</h1>
          <p>Welcome back! Manage your donations and help save lives.</p>
        </div>
      </div>



      <div className="dashboard-nav">
        <button 
          className={`dashboard-nav-btn ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button 
          className={`dashboard-nav-btn ${activeView === 'history' ? 'active' : ''}`}
          onClick={() => setActiveView('history')}
        >
          Donation History
        </button>
        <button 
          className={`dashboard-nav-btn ${activeView === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveView('opportunities')}
        >
          Opportunities
        </button>
      </div>



      <div className="dashboard-content">


        {activeView === 'overview' && (
          <div className="dashboard-overview">
            <div className="dashboard-stats-grid">
              {
                HeaderProperties.map((header, i) => {
                  return (
                    <div className="dashboard-stat-card" key={i}>
                      <div className="stat-icon-large">{header.icon}</div>
                      <div className="stat-content">
                        <div className="stat-value-large">{header.stat}</div>
                        <div className="stat-label-large">{header.text}</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div className="dashboard-profile-section">
              <Profile />

              <div className="quick-actions-card">
                <h2>Quick Actions</h2>
                <div className="quick-actions">
                  <button className="btn-quick-action" onClick={onOpenDonationForm}>
                    📝 Schedule Donation
                  </button>
                  <button className="btn-quick-action">
                    📋 View Certificate
                  </button>
                  <button className="btn-quick-action">
                    📊 View Statistics
                  </button>
                  </div>
              </div>
            </div>

            <div className="recent-activity-card">
              <h2>Recent Activity</h2>
              {
                donationHistory.length === 0? <div className='text-center'>No Available Activity</div> :
                <div className="activity-list">
                {donationHistory.slice(0, 3).map((donation, i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-icon">🩸</div>
                    <div className="activity-content">
                      <div className="activity-title">Donated at {donation.hospitalId.username}</div>
                      <div className="activity-date">{new Date(donation.createdAt).toDateString()}</div>
                    </div>
                    <div className="activity-status completed">Completed</div>
                  </div>
                ))}
               </div>
              }
            </div>
          </div>
        )}




        {activeView === 'history' && (
          <div className="dashboard-history">
            <h2>Donation History</h2>
            <div className="history-table">
              <div className="history-header">
                <div>Date</div>
                <div>Location</div>
                <div>Blood-type</div>
                <div>Hospital</div>
              </div>
              {donationHistory.map((donation, i) => (
                <div key={i} className="history-row">
                  <div>{new Date(donation.createdAt).toDateString()}</div>
                  <div>{donation.location}</div>
                  <div>{donation.bloodType} </div>
                  <div><span className="status-badge">{donation.hospitalId.username}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}






        {activeView === 'opportunities' && (

          
          <div className="dashboard-opportunities">

            {  opportunities.length === 0? '' :
              <div className={`fixed top-[10%] left-[10%] right-[10%] z-50 
                ${!pop? 'hidden': ''}
               bg-[#ffffff] shadow-2xl shadow-[#c3bfbf] h-[80vh] rounded-2xl place-content-center`} >
                  <span className='x' onClick={() => setPop(false)}>X</span>
                  

                  <div className='bg-[#b21616] text-white h-[5rem] flex items-center place-content-center text-[35px] w-full m-9'>{opportunities[popIndex].hospital}</div>

                  <div className='grid grid-cols-4 gap-[4rem] place-self-center items-center' id='pop'> 


                    <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'> BloodType:</div> <span className='text-[30px] text-[#e30d0d]'> {opportunities[popIndex].bloodType} </span> </div>

                    <div className={`text-[15px] shadow-2xl rounded-2xl`} style={{padding:'1.5rem'}}>
                      <div className='text-[30px]'>Urgency:</div> {opportunities[popIndex].urgency}
                    </div>

                    <div className={`text-[15px] shadow-2xl rounded-2xl`} style={{padding:'1.5rem'}}>
                      <div className='text-[30px]'>Status:</div> {opportunities[popIndex].status}
                    </div>

                    <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'>Date:</div> {new Date(opportunities[popIndex].createdAt).toDateString()}</div>
                  </div>

                  <div class='act-btn'>
                    <button className='bg-[#10ea10]' onClick={() => addToDonors(opportunities[popIndex]._id ,opportunities[popIndex].hospitalId)}>Donate</button>
                    <button className='deny-btn' onClick={() => setPop(false)}>Ignore</button>
                  </div>
              </div>
            }

            <h2>Available Donation Opportunities</h2>
            {
              opportunities.length === 0? <div className='text-center text-3xl'>No available Donation</div> :
              <div className="opportunities-list">
                {opportunities.map((opp, i) => (
                  <div key={opp.id} className="opportunity-card">
                    <div className="opportunity-header">
                      <div className="opportunity-hospital">{opp.hospital}</div>
                      <span className={`urgency-badge ${opp.urgency.toLowerCase()}`}>
                        {opp.urgency}
                      </span>
                    </div>
                    <div className="opportunity-details">
                      <div className="opportunity-detail">
                        <span className="detail-label">Blood Type:</span>
                        <span className="blood-type-badge-small">{opp.bloodType}</span>
                      </div>
                      <div className="opportunity-detail">
                        <span className="detail-label">Date Needed:</span>
                        <span>{new Date(opp.createdAt).toDateString()}</span>
                      </div>
                      <div className="opportunity-detail">
                        <span className="detail-label">Donors:</span>
                        <span>{opp.donors.length}</span>
                      </div>
                    </div>
                    <button className="btn-respond" onClick={() => setPopupFunc(i)}>Respond to Request</button>
                  </div>
                ))}
              </div>
            }

            
          </div>
      
          
        )}
      </div>
      <Toast />
    </div>
  )
}

export default DonorDashboard

