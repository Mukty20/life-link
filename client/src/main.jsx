import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProtectedRoute from '../public/context/protectedRoute.jsx'
import Bloodrequest from '../public/components/api/bloodrequest.jsx'
import Donor from '../public/components/api/donor.jsx'
import Matched from '../public/components/api/matched.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <Routes>
          <Route path='/' element={ 
            <ProtectedRoute>  
              <Donor>
                <Bloodrequest>
                 <Matched>
                   <App />
                 </Matched>
                </Bloodrequest>
              </Donor>
            </ProtectedRoute> 
        } />
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
