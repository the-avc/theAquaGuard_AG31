import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlowRatePlot from "./FlowRatePlot";
import PTAnomaly from "./PTAnomaly";

const WaterManage = () => {
    const [data, setData] = useState(null);
    const [timestamps, setTimestamps] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    // Fetch and process the CSV data
    useEffect(() => {
        const csvUrl = "/water_flow_data_with_anomaly_leak_old.csv";

        fetch(csvUrl)
            .then((response) => response.text())
            .then((csvData) => {
                const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true });
                const dataWithDates = parsedData.data.map((item) => ({
                    ...item,
                    DateObject: new Date(item.Timestamp), // Add Date object for filtering
                }));

                setData(dataWithDates);

                // Extract unique timestamps as Date objects
                const uniqueTimestamps = [...new Set(dataWithDates.map((item) => item.DateObject))];
                uniqueTimestamps.sort((a, b) => a - b); // Sort by date

                setTimestamps(uniqueTimestamps);

                // Set default range
                setStartTime(uniqueTimestamps[0]);
                setEndTime(uniqueTimestamps[uniqueTimestamps.length - 1]);
            })
            .catch((error) => console.error("Error fetching CSV:", error));
    }, []);

    if (!data || timestamps.length === 0) {
        return <div>Loading...</div>;
    }

    // Filter data based on the selected range
    const filteredData = data.filter(
        (item) => item.DateObject >= startTime && item.DateObject <= endTime
    );

    // Prepare the traces for the Plotly graph
    const temperatureTrace = {
        x: filteredData.map((item) => item.Timestamp),
        y: filteredData.map((item) => parseFloat(item.Temperature)),
        type: "bar",
        mode: "lines",
        name: "Temperature",
    };

    const pressureTrace = {
        x: filteredData.map((item) => item.Timestamp),
        y: filteredData.map((item) => parseFloat(item.Pressure)),
        mode: "lines",
        name: "Pressure",
    };

    const flowRateTrace = {
        x: filteredData.map((item) => item.Timestamp),
        y: filteredData.map((item) => parseFloat(item.Flow_Rate)),
        mode: "lines",
        name: "Flow Rate",
    };

    const anomalyPres = {
        x: filteredData.filter((item) => item.Anomaly_Detection === "1").map((item) => item.Timestamp),
        y: filteredData.filter((item) => item.Anomaly_Detection === "1").map((item) => parseFloat(item.Pressure)),
        mode: "markers",
        name: "Anomaly Detected",
        marker: { color: "purple" },
    };

    const leakPres = {
        x: filteredData.filter((item) => item.Leak_Detection === "1").map((item) => item.Timestamp),
        y: filteredData.filter((item) => item.Leak_Detection === "1").map((item) => parseFloat(item.Pressure)),
        mode: "markers",
        name: "Leak Detected",
        marker: { color: "green" },
    };

    const anomalyFlow = {
        x: data.filter(item => item.Anomaly_Detection === '1').map(item => item.Timestamp),
        y: data.filter(item => item.Anomaly_Detection === '1').map(item => parseFloat(item.Flow_Rate)),
        mode: 'markers',
        name: 'Anomaly Detected',
        marker: { color: 'purple' },
    };

    const leakFlow = {
        x: data.filter(item => item.Leak_Detection === '1').map(item => item.Timestamp),
        y: data.filter(item => item.Leak_Detection === '1').map(item => parseFloat(item.Flow_Rate)),
        mode: 'markers',
        name: 'Leak Detected',
        marker: { color: 'green' },
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50 p-6 sm:p-8 lg:p-12 flex flex-col items-center">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
                    Water Flow Data Visualization
                </h2>

                {/* DatePicker for selecting timestamp range */}
                <div className="flex justify-center items-center gap-6 mb-8">
                    <div>
                        <label className="font-medium text-gray-700 mb-2 block">Start Time:</label>
                        <DatePicker
                            selected={startTime}
                            onChange={(date) => setStartTime(date)}
                            selectsStart
                            startDate={startTime}
                            endDate={endTime}
                            minDate={timestamps[0]}
                            maxDate={timestamps[timestamps.length - 1]}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium text-gray-700 mb-2 block">End Time:</label>
                        <DatePicker
                            selected={endTime}
                            onChange={(date) => setEndTime(date)}
                            selectsEnd
                            startDate={startTime}
                            endDate={endTime}
                            minDate={timestamps[0]}
                            maxDate={timestamps[timestamps.length - 1]}
                            className="border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                </div>

                {/* Temperature Graph */}
                <div className="bg-white rounded-lg border-2 border-gray-300 shadow-xl mb-8 w-full lg:w-3/4 flex justify-center items-center">
                    <h3 className="text-1xl font-semibold text-center py-4 bg-blue-100 rounded-t-lg w-full">
                        Temperature
                    </h3>
                    <div className="w-full p-4">
                        <Plot
                            data={[temperatureTrace]}
                            layout={{
                                title: "Temperature",
                                xaxis: { title: "Timestamp" },
                                yaxis: { title: "Temperature (°C)" },
                                margin: { t: 40, b: 40, l: 40, r: 40 },
                                paper_bgcolor: "#f9fafb",
                            }}
                        />
                    </div>
                </div>

                {/* Pressure Graph */}
                <div className="bg-white rounded-lg border-2 border-gray-300 shadow-xl mb-8 w-full lg:w-3/4 flex justify-center items-center">
                    <h3 className="text-1xl font-semibold text-center py-4 bg-blue-100 rounded-t-lg w-full">
                        Pressure
                    </h3>
                    <div className="w-full p-4">
                        <Plot
                            data={[pressureTrace, anomalyPres, leakPres]}
                            layout={{
                                title: "Pressure",
                                xaxis: { title: "Timestamp" },
                                yaxis: { title: "Pressure (kPa)" },
                                margin: { t: 40, b: 40, l: 40, r: 40 },
                                paper_bgcolor: "#f9fafb",
                            }}
                        />
                    </div>
                </div>

                {/* Flow Rate Graph */}
                <div className="bg-white rounded-lg border-2 border-gray-300 shadow-xl mb-8 w-full lg:w-3/4 flex justify-center items-center">
                    <h3 className="text-1xl font-semibold text-center py-4 bg-blue-100 rounded-t-lg w-full">
                        Flow Rate
                    </h3>
                    <div className="w-full p-4">
                        <Plot
                            data={[flowRateTrace, anomalyFlow, leakFlow]}
                            layout={{
                                title: "Flow Rate",
                                xaxis: { title: "Timestamp" },
                                yaxis: { title: "Flow Rate (L/s)" },
                                margin: { t: 40, b: 40, l: 40, r: 40 },
                                paper_bgcolor: "#f9fafb",
                            }}
                        />
                    </div>
                </div>

                {/* Placeholder for Additional Flow Rate Plot */}
                <div className="bg-white rounded-lg border-2 border-gray-300 shadow-xl mb-8 w-full lg:w-3/4 flex justify-center items-center">
                    <h3 className="text-1xl font-semibold text-center py-4 bg-blue-100 rounded-t-lg w-full">
                        Peak Consumption Periods
                    </h3>
                    <div className="w-full p-4">
                        <FlowRatePlot startTime={startTime} endTime={endTime}/>
                    </div>
                </div>

                <PTAnomaly startTime={startTime} endTime={endTime}/>

            </div>
        </>
    );
};

export default WaterManage;
