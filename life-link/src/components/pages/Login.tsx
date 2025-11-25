import { useState } from 'react'

interface LoginProps {
  onSwitchToSignIn: () => void
  onClose: () => void
}

function Login({ onSwitchToSignIn, onClose }: LoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login data:', formData)
    alert('Logged in successfully!')
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <h1>Log In</h1>
          <p className="auth-subtitle">Welcome back to LIFE-LINK</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username or Email</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your username or email"
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

