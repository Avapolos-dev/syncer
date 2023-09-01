

import './App.css'
import { Routes, Route } from 'react-router-dom'

// Pages
import { Home } from '../pages/home/home'
import { Login } from '../pages/auth/login'

// Components
import { Header } from '../components/header/header'
import { Footer } from '../components/footer/footer'

// Context
import { AuthProvider } from '../context/authContext'

function App() {
  return (
    <div id="container-app" className='container-app'>
       <AuthProvider>
        <Header />
          <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
          </Routes>
        </AuthProvider>
        <Footer />
    </div>
  )
}

export default App
