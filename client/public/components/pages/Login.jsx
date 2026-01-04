import { useState } from 'react'
import axios from 'axios'
import useToast from '../../context/toast'

function Login({ onSwitchToSignIn, onClose}) {

  const setToast = useToast((state) => state.setToast)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
    postLogin()
    
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  async function postLogin() {

      setToast('loading please wait...')
      try {
        const res = await axios.post(`/api/login-${!formData.userType? 'donor': formData.userType}`,
          {
           
            email: formData.email,
            password: formData.password,
             
          },{ withCredentials: true })
  
          const data = await res.data
          

          setToast(data.message)
          window.location.reload()
          
        
      } catch (error) {
        
        console.log(error.message);
        setToast(error.message);
        
      }
    }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>×</button>
        <div className="auth-container">
          <h1>Log In</h1>
          <p className="auth-subtitle">Welcome back to LIFE-LINK</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>User Type</label>
              <select 
                name="userType" 
                value={formData.userType} 
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="donor">Donor</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>


            <div className="form-group">
              <button type="button" className="auth-forgot-btn">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn-submit">Log In</button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <button type="button" onClick={onSwitchToSignIn} className="auth-link-btn">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

