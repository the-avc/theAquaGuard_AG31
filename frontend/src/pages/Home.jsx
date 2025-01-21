import React from 'react'
import { useState, useEffect } from 'react'
import './Home.scss'
import AlertsHome from '../components/alertsHome'
import CurrReadings from '../components/CurrReadings'
import PredictReadings from '../components/PredictReadings'

const Home = () => {
  const [numLeaks, setNumLeaks] = useState(0);
  const targetLeaks = 35;

  useEffect(() => {
    const interval = setInterval(() => {
      setNumLeaks((prevNum) => {
        if (prevNum < targetLeaks) {
          return prevNum + 1;
        }
        clearInterval(interval);
        return prevNum;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='home bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50'>
      <AlertsHome />
      <CurrReadings />
      {/* leaks detected till Now */}
      <div className="leaks bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 p-6 rounded-lg shadow-xl text-white flex flex-col sm:flex-row items-center justify-center space-x-4 space-y-4 sm:space-y-0">
        <span className="text-4xl sm:text-5xl font-extrabold">Leaks Detected</span>
        <span className="text-5xl sm:text-6xl font-extrabold">{numLeaks}</span>
        <span className="text-xl sm:text-2xl">in the past year</span>
      </div>
      <PredictReadings />
      <h1 className="text-4xl md:text-6xl font-bold text-blue-800 text-center mt-10">
        AquaGuard
        <p className="text-lg md:text-xl font-medium text-gray-600 mt-2">
          Pani ka Doctor!!!!
        </p>
      </h1>

    </div>
  )
}

export default Home