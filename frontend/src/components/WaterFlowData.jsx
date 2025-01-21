import React from 'react'
import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'

const WaterFlowData = () => {
  const [temperatureData, setTemperatureData] = useState(null);
  const [pressureData, setPressureData] = useState([]);
  const [flowRateData, setFlowRateData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then((res) => {
        const data = res.data;

        const timestamps = data.map((item) => item.Timestamp);
        const temperature = data.map((item) => item.Temperature);
        const pressure = data.map((item) => item.Pressure);
        const flowRate = data.map((item) => item.Flow_Rate);

        // Set separate datasets for each plot
        setTemperatureData({
          x: timestamps,
          y: temperature,
          type: 'bar',
          name: 'Temperature',
          line: { color: 'red' },
        });

        setPressureData({
          x: timestamps,
          y: pressure,
          type: 'scatter',
          mode: 'lines',
          name: 'Pressure',
          line: { color: 'blue' },
        });

        setFlowRateData({
          x: timestamps,
          y: flowRate,
          type: 'scatter',
          mode: 'lines',
          name: 'Flow Rate',
          line: { color: 'green' },
        });
      })
      .catch((error) => {
        console.log(error);
      })

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 p-6 sm:p-8 lg:p-12">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
        Water Flow Data Visualization
      </h2>

      {/* Plot for Temperature */}
      <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-all mb-6">
        <h3 className="text-2xl font-semibold text-center py-4 bg-gray-200 rounded-t-lg">
          Temperature
        </h3>
        {temperatureData && (
          <Plot
            data={[temperatureData]}  // Pass as an array with a single object
            layout={{
              title: 'Temperature over Time',
              xaxis: { title: 'Timestamp' },
              yaxis: { title: 'Temperature (°C)' },
            }}
            className="rounded-b-lg"
          />
        )}
      </div>

      {/* Plot for Pressure */}
      <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-all mb-6">
        <h3 className="text-2xl font-semibold text-center py-4 bg-gray-200 rounded-t-lg">
          Pressure
        </h3>
        {pressureData && (
          <Plot
            data={[pressureData]}  // Pass as an array with a single object
            layout={{
              title: 'Pressure over Time',
              xaxis: { title: 'Timestamp' },
              yaxis: { title: 'Pressure (kPa)' },
            }}
            className="rounded-b-lg"
          />
        )}
      </div>

      {/* Plot for Flow Rate */}
      <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-all">
        <h3 className="text-2xl font-semibold text-center py-4 bg-gray-200 rounded-t-lg">
          Flow Rate
        </h3>
        {flowRateData && (
          <Plot
            className="rounded-b-lg"
            data={[flowRateData]}  // Pass as an array with a single object
            layout={{
              title: 'Flow Rate over Time',
              xaxis: { title: 'Timestamp' },
              yaxis: { title: 'Flow Rate (m³/h)' },
            }}
          />
        )}
      </div>
      {/* Footer */}
      
    </div>
  );
};
export default WaterFlowData