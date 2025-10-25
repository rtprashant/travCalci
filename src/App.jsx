import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<div className="p-8">Home Page</div>} />
          <Route path="/trips" element={<div className="p-8">Trips Page</div>} />
          <Route path="/about" element={<div className="p-8">About Page</div>} />
          <Route path="/contact" element={<div className="p-8">Contact Page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
