

import './App.css'
import { Routes, Route } from 'react-router-dom'

// Pages
import { Home } from '../pages/home/home'
import { Login } from '../pages/auth/login'

// Components
import { Header } from '../components/header/header'
import { Footer } from '../components/footer/footer'

function App() {
  return (
    <div id="container-app" className='container-app'>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
