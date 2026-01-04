import { BsFillHouseLockFill } from "react-icons/bs"; 
import { BiLoader } from "react-icons/bi"; 
import { FiWifiOff } from "react-icons/fi"; 
import { useState } from 'react'
import axios from 'axios'
import Toast from "../../../src/assets/toast";
import useHospitalAuth from "../../context/hospitalAuth";
import useToast from "../../context/toast";

import useBloodRequest from '../api/bloodrequest'
import useMatchedDonor from '../api/matched'
import useTotalDonor from "../api/totalDonor"

import useError from '../../context/error'
import useLoading from '../../context/loading'
import useRefresh from '../../context/refresh'


function HospitalDashboard({ onBack }) {

  const hospitalAuthenticated = useHospitalAuth((state) => state.authenticated)

  const error = useError((state) => state.error)
  const loading = useLoading((state) => state.loading)
  const refresh = useRefresh((state) => state.refresh)
  const setRefresh = useRefresh((state) => state.setRefresh)

  let bloodRequests = useBloodRequest((state) => state.bloodRequest)
  let matchedDonors = useMatchedDonor((state) => state.MatchedDonors)
  let totalDonor = useTotalDonor((state) => state.totalDonor)

  const setToast = useToast((state) => state.setToast)
  
  const critical = bloodRequests.filter((x) => x.urgency === 'critical')
  const matched = matchedDonors.length
  
  

  console.log(bloodRequests,'blood');
  console.log(matchedDonors,'bl d');
  
  

  const [bloodType, setBloodType] = useState('')
  const [urgency, setUrgency] = useState('')
  const [unit, setUnit] = useState(0)
  const [requiredDate, setRequiredDate] = useState('')
  const [note, setNote] = useState('')

  

  const [activeView, setActiveView] = useState('overview')
  const [showRequestForm, setShowRequestForm] = useState(false)


  const HeaderProperties = [
  {
    icon: '🩸',
    stat: totalDonor.length,
    text: 'total donation'
  },

  {
    icon: '✅',
    stat: bloodRequests.length,
    text: 'Total Requests'
  },

  {
    icon:'🫂' ,
    stat: matched,
    text: 'Matched Donors'
  },

  {
    icon:'🔴' ,
    stat: critical.length,
    text: 'Critical Requests'
  },
  
]

  

  const handleSubmitRequest = (e) => {
    e.preventDefault()
    postBloodRequest()
    setShowRequestForm(false)
  }


  //  function for posting blood request
      async function postBloodRequest() {
        if(!bloodType || !unit || !urgency || !requiredDate || !note) return alert('all input must be filled')
        try {
          setRefresh(!refresh)
          const res = await axios.post('/api/blood-request',
            {
             
              bloodType: bloodType,
              unit: unit,
              urgency: urgency,
              requiredDate: requiredDate,
              note: note
               
            },{ withCredentials: true })
    
            const data = await res.data
            console.log(data);
            setToast(data.message)
            
          
        } catch (error) {
          
          console.log(error.message);
          setToast(error.message)
          
        }
      }



      // function for updating blood request status
      async function postReqStatus(reqId) {
        setRefresh(!refresh)
        try {
          const res = await axios.patch('/api/blood-req-status',
            {
              reqId

            },{ withCredentials: true })
    
            const data = await res.data
            console.log(data);
            
            setToast(data.message)
            
          
        } catch (error) {
          
          console.log(error.message);
          setToast(error.message)
          
        }
      }



      // function for deleting blood request
      async function deleteReq(reqId) {

        setRefresh(!refresh)
        
        try {
          const res = await axios.delete(`/api/blood-req/${reqId}`,
          { 
            withCredentials: true 
          })
    
            const data = await res.data
            console.log(data);
            
            setToast(data.message)
            
          
        } catch (error) {
          
          console.log(error.message);
          setToast(error.message)
          
        }
      }
  



      const [pop, setPop] = useState(false)
      const [popIndex, setPopIndex] = useState(0)

      const [popDonor, setPopDonor] = useState(false)
      const [popIndexDonor, setPopIndexDonor] = useState(0)
      const [viewMore, setViewMore] = useState(1)

      
      
    
    function setPopupFunc(i) {
        setPop(true)
        setPopIndex(i)
    }

    function setDonorPop(i) {
        setPopDonor(true)
        setPopIndexDonor(i)
    }

    



    // loading animation for real time visualization
   if(loading) return (
      <div className='fixed top-[40%]'>
        <div className="w-[fit-content] place-self-center animate-spin text-[90px]"> <BiLoader /></div>
      </div>
    )


  
    // error message for showing internet error or server error occurance
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


    // auth blocker render for blocking unauthorized users
    if(!hospitalAuthenticated) return (
      <div className='fixed top-[40%] place-items-center flex flex-col gap-[.5rem]'>
        <div className="w-[120px] h-[120px] rounded-full bg-white place-content-center place-items-center text-[60px]"> <BsFillHouseLockFill /> </div>
        <h2 className="text-[red]">Unauthorized Access Denied To Hospital Dashboard</h2>
        <button className="rounded-3xl bg-[#131212] text-white cursor-pointer" style={{padding:'.5rem 2rem'}}  onClick={onBack}>Login / signup</button>
      </div>
    )
  


  // dashboard content for hospital
  return (
    <div className="dashboard-container">     


      {/* dashboard header section for hospital */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <button className="btn-back" onClick={onBack}>← Back to Home</button>
          <h1>Hospital Dashboard</h1>
          <p>Manage blood requests and connect with donors.</p>
        </div>
      </div>



      {/* dashboard nav bar section for hospital*/}
      <div className="dashboard-nav">
        <button 
          className={`dashboard-nav-btn ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button 
          className={`dashboard-nav-btn ${activeView === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveView('requests')}
        >
          Blood Requests
        </button>
        <button 
          className={`dashboard-nav-btn ${activeView === 'donors' ? 'active' : ''}`}
          onClick={() => setActiveView('donors')}
        >
          Matched Donors
        </button>
      </div>



      {/* dashboard content for hospital */}
      <div className="dashboard-content">


        {/* overview section */}
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

            <div className="quick-actions-card">
              <h2>Quick Actions</h2>
              <div className="quick-actions">
                <button className="btn-quick-action" onClick={() => setShowRequestForm(true)}>
                  ➕ Create Blood Request
                </button>
                <button className="btn-quick-action">
                  🔍 Search Donors
                </button>
                <button className="btn-quick-action">
                  📊 View Reports
                </button>
              </div>
            </div>

            <div className="recent-requests-card">
              <div className="card-header">
                <h2>Recent Blood Requests</h2>
                {
                  bloodRequests.length === 0? '':
                  viewMore === 1? <button className="btn-view-all" onClick={() => setViewMore(bloodRequests.length-1 + 1)}>View All</button> :
                  <button className="btn-view-all" onClick={() => setViewMore(1)}>View Less</button> 
                }
              </div>
              <div className="requests-list-compact">
                {
                bloodRequests.length === 0 ? <div className='text-center text-3xl'>Request Are Currently Empty</div> :
                bloodRequests.slice(0, viewMore).map((request) => (
                  <div key={request.id} className="request-item-compact">
                    <div className="request-item-header">
                      <span className="blood-type-badge-small">{request.bloodType}</span>
                      <span className={`urgency-badge ${request.urgency.toLowerCase()}`}>
                        {request.urgency}
                      </span>
                    </div>
                    <div className="request-item-details">
                      <span>{request.unit} units</span>
                      <span>•</span>
                      <span>{new Date(request.createdAt).toDateString()}</span>
                      <span>•</span>
                      <span className={request.status === 'Matched' ? 'status-matched' : 'status-pending'}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/*blood request section */}
        {activeView === 'requests' && (
          <div className="dashboard-requests">
            <div className="section-header">
              <h2>Blood Requests</h2>
              <button className="btn-new-request" onClick={() => setShowRequestForm(true)}>
                + New Request
              </button>
            </div>

            {showRequestForm && (
              <div className="request-form-card">
                <h3>Create New Blood Request</h3>
                <form onSubmit={handleSubmitRequest} className="request-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Blood Type Required</label>
                      <select className="form-select" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
                        <option value="">Select blood type</option>
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
                    <div className="form-group">
                      <label>Units Required</label>
                      <input type="number" className="form-input" placeholder="Enter units" value={unit} onChange={(e) => setUnit(e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Urgency</label>
                      <select className="form-select" value={urgency} onChange={(e) => setUrgency(e.target.value)} required>
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Required Date</label>
                      <input type="date" className="form-input" value={requiredDate} onChange={(e) => setRequiredDate(e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>Additional Notes</label>
                    <textarea className="form-textarea" placeholder="Any special requirements or notes..." value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">Submit Request</button>
                    <button type="button" className="btn-cancel" onClick={() => setShowRequestForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            { bloodRequests.length === 0? <div className='text-center text-4xl'>Requests Are Currently Empty </div> :
              <div className="requests-table">
            
              
              <div className="requests-header">
                <div>Blood Type</div>
                <div>Units</div>
                <div>Urgency</div>
                <div>Date</div>
                <div>Status</div>
                <div>Matches</div>
                <div>Actions</div>
              </div>
            
              <div>
                <div className={`fixed top-[10%] left-[10%] right-[10%] z-50 
                      ${!pop? 'hidden': ''}
                    bg-[#ffffff] shadow-2xl shadow-[#c9c2c2] h-[80vh] rounded-2xl place-content-center`
                }>
                    <span className='x' onClick={() => setPop(false)}>X</span>

                    <div className='text-center text-[45px] bold p-[3rem]'>
                      <div>Total Donors</div>
                      <div className='bg-[#b20f0f] text-white'>{!bloodRequests[popIndex].donors.length? 0 : bloodRequests[popIndex].donors.length}</div>
                    </div>

                    <div className='grid grid-cols-4 gap-[4rem] place-self-center items-center' id='pop'> 

                      <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'>BloodType:</div> {bloodRequests[popIndex].bloodType} </div>

                      <div className={`text-[15px] shadow-2xl rounded-2xl`} style={{padding:'1.5rem'}}>
                        <div className='text-[25px] text-red-600'>Urgency:</div> {bloodRequests[popIndex].urgency}
                      </div>

                      <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'>Status:</div> {bloodRequests[popIndex].status}</div>

                      <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'>Date:</div> {new Date(bloodRequests[popIndex].createdAt).toDateString()}</div>

                    </div>

                    <div class='act-btn '>
                      <button className='bg-[#b20f0f]' onClick={() => postReqStatus(bloodRequests[popIndex]._id)} >Close Donation</button>
                    </div>
                </div>





                {
                bloodRequests.map((request, i) => (
                  <div key={request.id} className="requests-row">
                    <div><span className="blood-type-badge-small">{request.bloodType}</span></div>
                    <div>{request.unit}</div>
                    <div><span className={`urgency-badge ${request.urgency.toLowerCase()}`}>{request.urgency}</span></div>
                    <div>{new Date(request.createdAt).toDateString()}</div>
                    <div>
                      <span className={request.status === 'Matched' ? 'status-matched' : 'status-pending'}>
                        {request.status}
                      </span>
                    </div>
                    <div>{request.donors.length} donors</div>
                    <div>
                      <button className="btn-action-small" onClick={() => setPopupFunc(i)}>View</button>
                      <button className="btn-action-small secondary" onClick={() => deleteReq(request._id)}>delete</button>
                    </div>
                  </div>
                ))}
              </div>  
            
            </div>
          }
          </div>
        )}



        {/*matched donor section */}
        {activeView === 'donors' && (
          <div className="dashboard-donors">
            <h2>Matched Donors</h2>

            

            {  matchedDonors.length === 0? <div className='text-center text-3xl'>No Donors Available</div> :
              <div className="donors-grid">


              <div className={`fixed top-[10%] left-[10%] right-[10%] z-50 
                      ${!popDonor? 'hidden': ''}
                    bg-[#ffffff] shadow-2xl shadow-[#c9c2c2] h-[80vh] rounded-2xl place-content-center`
                }>
                    <span className='x' onClick={() => setPopDonor(false)}>X</span>

                    <div className='text-center text-[45px] bold p-[3rem]'>
                      <div className='bg-[#b20f0f] text-white'>Donor Details</div>
                    </div>

                    <div className='grid grid-cols-4 gap-[3rem] place-self-center items-center' id='pop'> 

                      <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'>UserName:</div> {matchedDonors[popIndexDonor].donorId.username} </div>

                      <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'>Age:</div> {matchedDonors[popIndexDonor].donorId.age} </div>

                      <div className={`text-[15px] shadow-2xl rounded-2xl`} style={{padding:'1.5rem'}}>
                        <div className='text-[25px] text-red-600'>Email:</div> {matchedDonors[popIndexDonor].donorId.email}
                      </div>

                      <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'>Location:</div> {matchedDonors[popIndexDonor].donorId.location}</div>

                      <div className='text-[15px] shadow-2xl rounded-2xl' style={{padding:'1.5rem'}}> <div className='text-[30px]'>Joined:</div> {new Date(matchedDonors[popIndexDonor].donorId.createdAt).toDateString()}</div>

                    </div>
                </div>




              {matchedDonors.map((donor,i) => (
                <div key={donor.id} className="donor-card-dashboard">
                  <div className="donor-card-header">
                    <div className="blood-type-badge">{donor.donorId.bloodType}</div>
                    <span className="status-badge available">Available</span>
                  </div>
                  <div className="donor-card-body">
                    <h3>{donor.donorId.name}</h3>
                    <p className="donor-location">🗺️ {donor.donorId.location}</p>
                    <p className="donor-phone">📞 {donor.donorId.phone}</p>
                  </div>
                  <div className="donor-card-actions">
                    <button className="btn-contact">Contact</button>
                    <button className="btn-view-profile" onClick={() => setDonorPop(i)}>View Profile</button>
                  </div>
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

export default HospitalDashboard

