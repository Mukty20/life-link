import { useState } from 'react'
import { BiLoader } from 'react-icons/bi'
import './App.css'
import './index.css'
import axios from 'axios'
import useLoading from '../public/context/loading'

import useHospitalAuth from '../public/context/hospitalAuth'
import useAuth from '../public/context/isAuth'
import useToast from '../public/context/toast'

import Toast from './assets/toast'
import SignIn from '../public/components/pages/SignIn'
import Login from '../public/components/pages/Login'
import DonationForm from '../public/components/pages/Donor page/DonationForm'
import DonorDashboard from '../public/components/pages/Donor page/DonorDashboard'
import HospitalDashboard from '../public/components/pages/HospitalDashboard'
import Footer from '../public/components/layout/Footer'


function App() {

  const loading = useLoading((state) => state.loading)

  const userAuthenticated = useAuth((state) => state.authenticated)
  const hospitalAuthenticated = useHospitalAuth((state) => state.authenticated)
  const setToast = useToast((state) => state.setToast)
  
  const [loggout, setLoggout] = useState(false)
  

  const [showLogin, setShowLogin] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [showDonorDashboard, setShowDonorDashboard] = useState(false)
  const [showHospitalDashboard, setShowHospitalDashboard] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  async function loggoutPost(type) {
        try{
          
          const res = await axios.post(`/api/${type}/logout`,
            { },
          {
            withCredentials: true
          })

          const data = await res.data

          console.log(data);
          setToast(data.message)
          
          
          
          window.location.reload()
          
        
        }catch(err){

          console.log(err);
          setToast(err.message)
          

        }
  }
  



  
  // Show dashboards if active
  if (showDonorDashboard) {
    return (
      <div className="app">
        <DonorDashboard 
          onBack={() => setShowDonorDashboard(false)}
          onOpenDonationForm={() => setShowDonationForm(true)}
        />
        {showDonationForm && (
          <DonationForm onClose={() => setShowDonationForm(false)} />
        )}
      </div>
    )
  }

  if (showHospitalDashboard) {
    return (
      <div className="app">
        <HospitalDashboard onBack={() => setShowHospitalDashboard(false)} />
      </div>
    )
  }


  



  return (
    <div className="app">
      
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1> LIFE-LINK</h1>
          </div>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
          </button>
          <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#home" onClick={(e) => { e.preventDefault(); setShowDonorDashboard(false); setShowHospitalDashboard(false); setMobileMenuOpen(false) }}>Home</a>
            <button className="nav-link-btn" onClick={() => { setShowDonorDashboard(true); setMobileMenuOpen(false) }}>Donor Dashboard</button>
            <button className="nav-link-btn" onClick={() => { setShowHospitalDashboard(true); setMobileMenuOpen(false) }}>Hospital Dashboard</button>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <div className="nav-auth-buttons">
              <button className="btn-primary" onClick={() => { setShowSignIn(true); setMobileMenuOpen(false) }}>Sign Up</button>
              <button className="btn-secondary" onClick={() => { setShowLogin(true); setMobileMenuOpen(false) }}>Log In</button>
            </div>
          </nav>

          <div className='relative'>
            {
            hospitalAuthenticated && userAuthenticated ? <button className="btn-primary" onClick={() => setLoggout(!loggout)}>logout</button> :
            
            <div className="auth-buttons desktop-auth">
              <button className="btn-primary" onClick={() => setShowSignIn(true)}>Sign Up</button>
              <button className="btn-secondary" onClick={() => setShowLogin(true)}>Log In</button>
              <button className="btn-primary" onClick={() => setLoggout(!loggout)}>account</button>
            </div>

            }
            <div className={` absolute bg-[white] right-0 rounded-2xl flex flex-col gap-4 ${!loggout? 'hidden' : ''}`} style={{padding:'1rem'}}>

              <div className='cursor-pointer bold' onClick={() => loggoutPost('donor')}>Logout as Donor</div>

              <div className='cursor-pointer bold' onClick={() => loggoutPost('hospital')}>Logout as Hospital</div>

            </div>
          </div>

        </div>
      </header>

      
      <section className="home" id="home">

        <div className="home-content">
            <h2 className="home-title">SAVE A LIFE, DONATE BLOOD TODAY!</h2>
            <p className="home-subtitle">
              Register as a donor and make a difference.
              Book a quick, safe donation appointment near you.
            </p>
            <div className="home-buttons">
              <button className="btn-home1" onClick={() => setShowDonationForm(true)}>Register To Donate</button>
            </div>
        </div>


        <div className="home-stats">

          <div className="stat-card">
            <div className="stat-number">2,476</div>
            <div className="stat-label">Active Donors</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">69</div>
            <div className="stat-label">Partner Hospitals</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">4,565</div>
            <div className="stat-label">Lives Saved</div>
          </div>

        </div>
      </section>  

      <h1>Donation Process</h1>

      <section className='home-stats' id='process'>

        <div className='stat-card'>
          <div className='stat-number'>Registration</div>
          <div className='stat-label'>Register by entering your name, contact information,
            and blood type so we can notify you when donors are needed.</div>
        </div>

        <div className='stat-card'>
          <div className='stat-number'>Donation</div>
          <div className='stat-label'>Visit the nearest center to donate and save lives.</div>
        </div>

      </section>  

      <h1>Ready To Save A Life Today?</h1>
      <button className='btn-home1' onClick={() => { setShowSignIn(true); setMobileMenuOpen(false) }}>Sign Up To Donate</button>

      <Footer />

      {/* Modals */}
      {showLogin && (
        <Login 
          onSwitchToSignIn={() => {
            setShowLogin(false)
            setShowSignIn(true)
          }}
          onClose={() => setShowLogin(false)}
          setShowHospitalDashboard={setShowHospitalDashboard}
          setShowDonorDashboard={setShowDonorDashboard}
        />
      )}
      
      {showSignIn && (
        <SignIn 
          onSwitchToLogin={() => {
            setShowSignIn(false)
            setShowLogin(true)
          }}
          onClose={() => setShowSignIn(false)}
        />
      )}

      {showDonationForm && (
        <DonationForm 
          onClose={() => setShowDonationForm(false)}
        />
      )}

      <Toast />
      
    </div>
  )
}

export default App