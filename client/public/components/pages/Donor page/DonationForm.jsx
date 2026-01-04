import { useState, useEffect } from 'react'
import axios from 'axios'
import useRefresh from '../../../context/refresh'


function DonationForm({ onClose }) {
  
  const refresh = useRefresh((state) => state.refresh)
  const setRefresh = useRefresh((state) => state.setRefresh)

  const [loading, setLoaing] = useState(false)
  const [hospitalName, setHospitalName] = useState('')
  const [hospitals, setHospitals] = useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    bloodType: '',
    age: '',
    location: '',
    phone: '',
    email: '',
    hospitalId: '',
    lastDonationDate: '',
    healthConditions: '',
    availability: '',
    preferredDate: '',
    preferredTime: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle donation form submission
    postDonation()
    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function fetchHospitals() {
    setLoaing(true)
    
    try {
      
      const res = await axios.get('/api/hospital',{
        withCredentials: true
      })

      const data = await res.data

      setLoaing(false)
      console.log(data,'hospital form');
      setHospitals(data.data || [])
      

    } catch (error) {
      
      console.log(error);
      setLoaing(false)
      

    }

  }

  useEffect(() => {
    fetchHospitals()
  },[])


  async function postDonation() {
      setRefresh(!refresh)
      
      try {
        const res = await axios.post('/api/donation',
          {
            fullName: formData.fullName,
            bloodType: formData.bloodType,
            age: formData.age,
            location: formData.location,
            phone: formData.phone,
            email: formData.email,
            hospitalId: formData.hospitalId,
            hospitalname: hospitalName,
            lastDonationDate: formData.lastDonationDate,
            healthConditions: formData.healthConditions,
            availability: formData.availability,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime,
            emergencyContact: formData.emergencyContact,
            emergencyPhone: formData.emergencyPhone
          
          },{ withCredentials: true })
  
          const data = await res.data
          console.log(data);
          
         
        
      } catch (error) {
        
        console.log(error);
        
      }
    }
  

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal donation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>×</button>
        <div className="auth-container">
          <h1>Blood Donation Form</h1>
          <p className="auth-subtitle">Your donation can save lives. Fill out the form below.</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Blood Type</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
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
            </div>

            <div className="form-group">
                <label>Hospital</label>
                <select
                  name="hospitalId"
                  value={formData.hospitalId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Hospital</option>
                  {
                    loading?  <option value={''}>loaing..</option> : 
                    hospitals.map((x, i) => {
                      return(
                        <option value={x._id} key={i}>{x.username}</option>
                      )
                    })
                  }
                </select>
              </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your age"
                  min="18"
                  max="65"
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="City or area"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your contact number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Last Donation Date</label>
                <input
                  type="date"
                  name="lastDonationDate"
                  value={formData.lastDonationDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="immediate">Immediate</option>
                  <option value="this-week">This Week</option>
                  <option value="next-week">Next Week</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Preferred Time</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Health Conditions (if any)</label>
              <textarea
                name="healthConditions"
                value={formData.healthConditions}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Please mention any health conditions, medications, or allergies..."
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Emergency Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Emergency contact person"
                  required
                />
              </div>
              <div className="form-group">
                <label>Emergency Contact Phone</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Emergency contact number"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">Submit Donation Form</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DonationForm

