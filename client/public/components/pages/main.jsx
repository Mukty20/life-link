import React from 'react'
import { useState } from 'react'
import DonationForm from '../public/components/pages/DonationForm'
import DonorDashboard from '../public/components/pages/DonorDashboard'
import HospitalDashboard from '../public/components/pages/HospitalDashboard'


const Main = () => {

    
 
    const [showDonationForm, setShowDonationForm] = useState(false)
    const [showDonorDashboard, setShowDonorDashboard] = useState(false)
    const [showHospitalDashboard, setShowHospitalDashboard] = useState(false)
    //const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    


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
  
}

export default Main
