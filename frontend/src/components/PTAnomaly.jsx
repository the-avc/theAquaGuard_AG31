import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";

const PTAnomaly = ({ startTime, endTime }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/pressure_temp_anomaly.csv");
      const csvData = await response.text();

      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const processedData = result.data.map((item) => ({
            ...item,
            DateObject: new Date(item["Time (hours)"]),
          }));
          setData(processedData);
        },
        error: (error) => console.error("Error parsing CSV:", error),
      });
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const filteredData = data.filter(
    (item) => item.DateObject >= startTime && item.DateObject <= endTime
  );

  const tempTrace = {
    x: filteredData.map((row) => row["Time (hours)"]),
    y: filteredData.map((row) => parseFloat(row["Water Temperature (°C)"])),
    mode: "lines",
    name: "Water Temperature (°C)",
    line: { color: "blue" },
  };

  const highTempAnomaly = {
    x: filteredData
      .filter((row) => row.temp_anomaly === "high")
      .map((row) => row["Time (hours)"]),
    y: filteredData
      .filter((row) => row.temp_anomaly === "high")
      .map((row) => parseFloat(row["Water Temperature (°C)"])),
    mode: "markers",
    name: "High Temperature Anomaly",
    marker: { color: "red", size: 6 },
  };

  const lowTempAnomaly = {
    x: filteredData
      .filter((row) => row.temp_anomaly === "low")
      .map((row) => row["Time (hours)"]),
    y: filteredData
      .filter((row) => row.temp_anomaly === "low")
      .map((row) => parseFloat(row["Water Temperature (°C)"])),
    mode: "markers",
    name: "Low Temperature Anomaly",
    marker: { color: "green", size: 6 },
  };

  const pressureTrace = {
    x: filteredData.map((row) => row["Time (hours)"]),
    y: filteredData.map((row) => parseFloat(row["Pressure (Pa)"])),
    mode: "lines",
    name: "Pressure (Pa)",
    line: { color: "blue" },
  };

  const highPressureAnomaly = {
    x: filteredData
      .filter((row) => row.press_anomaly === "high")
      .map((row) => row["Time (hours)"]),
    y: filteredData
      .filter((row) => row.press_anomaly === "high")
      .map((row) => parseFloat(row["Pressure (Pa)"])),
    mode: "markers",
    name: "High Pressure Anomaly",
    marker: { color: "red", size: 6 },
  };

  const lowPressureAnomaly = {
    x: filteredData
      .filter((row) => row.press_anomaly === "low")
      .map((row) => row["Time (hours)"]),
    y: filteredData
      .filter((row) => row.press_anomaly === "low")
      .map((row) => parseFloat(row["Pressure (Pa)"])),
    mode: "markers",
    name: "Low Pressure Anomaly",
    marker: { color: "green", size: 6 },
  };

  return (
    <>
      {/* Temperature Plot */}
      <div className="bg-white rounded-lg border-2 border-gray-300 shadow-xl mb-8 w-full lg:w-3/4 flex justify-center items-center">
        <h3 className="text-1xl font-semibold text-center py-4 bg-blue-100 rounded-t-lg w-full">
          Temperature Anomalies
        </h3>
        <div className="w-full p-4">
          <Plot
            data={[tempTrace, highTempAnomaly, lowTempAnomaly]}
            layout={{
              title: "Water Temperature with High and Low Anomalies",
              xaxis: { title: "Time (Hours)" },
              yaxis: { title: "Temperature (°C)" },
              template: "plotly_dark",
              showlegend: true,
            }}
          />
        </div>
      </div>

      {/* Pressure Plot */}
      <div className="bg-white rounded-lg border-2 border-gray-300 shadow-xl mb-8 w-full lg:w-3/4 flex justify-center items-center">
        <h3 className="text-1xl font-semibold text-center py-4 bg-blue-100 rounded-t-lg w-full">
          Pressure Anomalies
        </h3>
        <div className="w-full p-4">
          <Plot
            data={[pressureTrace, highPressureAnomaly, lowPressureAnomaly]}
            layout={{
              title: "Water Pressure with High and Low Anomalies",
              xaxis: { title: "Time (Hours)" },
              yaxis: { title: "Pressure (Pa)" },
              template: "plotly_dark",
              showlegend: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PTAnomaly;
