import React from 'react'
import './alertsHome.scss'
const alertsHome = () => {
  return (
    <div className="alertsHome bg-gradient-to-r from-red-400 via-red-500 to-red-600 p-6 rounded-lg shadow-xl mt-6 flex items-center justify-center  space-x-4">
      <div className="flex flex-col space-y-2">
        <h2 className="text-white text-2xl font-semibold">Alerts !!</h2>
        <p className="text-white text-lg">Currently no errors detected. System working fine</p>
      </div>
    </div>


  )
}

export default alertsHome