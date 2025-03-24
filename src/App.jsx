import Header from './components/Header'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import Chatbot from './components/ChatBot'


function App() {


  return (
    <div>
      <AuthProvider>
          <Header/>
        <Outlet />
          <Chatbot />
        <Footer />
        <Toaster/>
      </AuthProvider>
    </div>
  )
}

export default App
