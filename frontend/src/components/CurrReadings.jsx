import React from 'react'
// import './CurrReadings.scss'

const CurrReadings = () => {
  return (
    <div className="currReadings p-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-xl max-w-5xl mx-auto">
      <h2 className="CurrReadingTitle text-4xl font-semibold text-white text-center mb-6">Current Readings</h2>
      <div className="currReadingsContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Water Flow */}
        <div className="waterFlow currRead bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h2 className="text-5xl font-bold text-indigo-600">98.4</h2>
          <p className="CurrReadTitle text-xl text-gray-500">m<sup>3</sup>/s</p>
          <p className="text-xl text-gray-700 font-semibold">Water Flow</p>
        </div>

        {/* Pressure */}
        <div className="pressure currRead bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h2 className="text-5xl font-bold text-green-600">49.7 </h2>
          <p className="CurrReadTitle text-xl text-gray-500">Pascal</p>
          <p className="text-xl text-gray-700 font-semibold">Pressure</p>
        </div>

        {/* Temperature */}
        <div className="temp currRead bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300">
          <h2 className="text-5xl font-bold text-red-600">18&deg;C</h2>
          <p className="CurrReadTitle text-xl text-gray-500">Celsius</p>
          <p className="CurrReadTitle text-xl text-gray-700 font-semibold">Temperature</p>
        </div>
      </div>
    </div>
  )
}

export default CurrReadings
