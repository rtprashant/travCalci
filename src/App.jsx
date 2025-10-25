import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'


import InputBox from './components/InputBox'

import AboutPage from './pages/AboutPage' // Assuming this path is correct
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <>
    <BrowserRouter>
      {/* 1. Changed to a subtle gradient background */}
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <Header />
        
        {/* 2. Set the global top padding here to clear the fixed header */}
        <main className="">
          <Routes>
            <Route path="/" element={ <InputBox/>} />
            {/* <Route path="/trips" element={<div className="p-8">Trips Page</div>} /> */}
            
            <Route path="/about" element={<AboutPage />} />
            
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
   
    </>
    
  )
}

export default App