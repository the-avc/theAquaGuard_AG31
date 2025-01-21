import React from 'react'
// import './PredictReadings.scss'

const PredictReadings = () => {
    return (
        <div className="predReadings p-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-lg max-w-5xl mx-auto">
            <h2 className="text-4xl font-semibold text-white text-center mb-6">Predicted Readings</h2>

            <div className="predReadingsContainer grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Water Flow Card */}
                <div className="card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800">Water Flow</h3>
                    <p className="text-3xl font-bold text-gray-800">25.4 <span className="text-xl text-gray-500">m³/s</span></p>
                </div>

                {/* Pressure Card */}
                <div className="card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800">Pressure</h3>
                    <p className="text-3xl font-bold text-gray-800">28.16 <span className="text-xl text-gray-500">Pa</span></p>
                </div>

                {/* Temperature Card */}
                <div className="card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800">Temperature</h3>
                    <p className="text-3xl font-bold text-gray-800">17.9 <span className="text-xl text-gray-500">°C</span></p>
                </div>
            </div>

            {/* Remarks Section */}
            <div className="PredRemarks mt-6 bg-white p-4 rounded-lg shadow-md text-center text-2xl">
                <p className="font-bold text-gray-800">Remarks:</p>
                <p className="text-gray-600">Possibility of low pressure anomaly</p>
            </div>
        </div>

    )
}

export default PredictReadings

