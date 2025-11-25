import { useState } from 'react'

interface SignInProps {
  onSwitchToLogin: () => void
  onClose: () => void
}

function SignIn({ onSwitchToLogin, onClose }: SignInProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    bloodType: '',
    location: '',
    phone: '',
    userType: 'donor'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sign up data:', formData)
    alert('Account created successfully!')
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>×</button>
        <div className="auth-container">
          <h1>Sign Up</h1>
          <p className="auth-subtitle">Create your account to join LIFE-LINK</p>
          
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
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Choose a username"
                  required
                />
              </div>
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

            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            {formData.userType === 'donor' && (
              <>
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
              </>
            )}

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

            <button type="submit" className="btn-submit">Sign Up</button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <button type="button" onClick={onSwitchToLogin} className="auth-link-btn">
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn

