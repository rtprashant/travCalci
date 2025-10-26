import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { lazy } from 'react'
import { Suspense } from 'react'
const InputBox = lazy(() => import('./pages/InputBox'))
const ItineraryPage = lazy(() => import('./pages/ItenaryPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PlanYourTripPage = lazy(() => import('./pages/PlanYourTrip'))




function App() {
  return (
    <>
    <BrowserRouter>
      {/* 1. Changed to a subtle gradient background */}
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
        {/* 2. Set the global top padding here to clear the fixed header */}
        <main className="">
          <Routes>
            <Route path="/" element={ <InputBox/>} />
            <Route path="/trips" element={<ItineraryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/planYourTrip" element={ <PlanYourTripPage />} />
          </Routes>
        </main>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
   
    </>
    
  )
}

export default App