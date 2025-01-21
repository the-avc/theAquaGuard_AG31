import { useState } from 'react'
import WaterManage from './components/WaterManage'
// import './App.css'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home.jsx'
import PageLoader from './pages/pageLoader.jsx'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <div className='AppMainJsx'>
      <Navbar />

      {/* <Home /> */}
      <div className="mainPage">

        <PageLoader />
      </div>
      
    </div>
    <Footer/>
 </>
  )
}
export default App
