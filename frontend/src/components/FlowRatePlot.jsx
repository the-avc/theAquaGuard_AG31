import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const FlowRateGraph = ({ startTime, endTime }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Read and process CSV file
    const csvUrl = "/peaks.csv";
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (result) => {
        const processedData = processCSVData(result.data);
        setData(processedData);
      },
      error: (error) => {
        console.error('Error reading CSV file', error);
      },
    });
  }, []);

  const processCSVData = (csvData) => {
    // Parse and convert CSV data into a suitable format
    const time = csvData.map(row => row['Time (hours)']);
    const flowRate = csvData.map(row => parseFloat(row['Flow Rate (m³/s)']));

    // Calculate sma, std, bb_up, and identify peaks
    const sma = calculateSMA(flowRate, 12);
    const std = calculateSTD(flowRate, 12, sma);
    const bb_up = sma.map((val, index) => val + 1.75 * (std[index] || 0)); // Prevent NaN from empty std
    const peaks = identifyPeaks(flowRate, bb_up, sma);

    // Return processed data
    return { time, flowRate, sma, std, bb_up, peaks };
  };

  // Calculate Simple Moving Average (SMA)
  const calculateSMA = (data, window) => {
    const sma = [];
    for (let i = 0; i < data.length; i++) {
      if (i < window - 1) {
        sma.push(null); // Insufficient data for moving average
      } else {
        const windowData = data.slice(i - window + 1, i + 1);
        sma.push(windowData.reduce((acc, curr) => acc + curr, 0) / window);
      }
    }
    return sma;
  };

  // Calculate Standard Deviation (STD)
  const calculateSTD = (data, window, sma) => {
    const std = [];
    for (let i = 0; i < data.length; i++) {
      if (i < window - 1) {
        std.push(null); // Insufficient data for std
      } else {
        const windowData = data.slice(i - window + 1, i + 1);
        const mean = sma[i];
        const variance = windowData.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / window;
        std.push(Math.sqrt(variance));
      }
    }
    return std;
  };

  // Identify Peaks
  const identifyPeaks = (flowRate, bb_up, sma) => {
    const peaks = new Array(flowRate.length).fill(0);
    let inHigh = false;
    for (let i = 1; i < flowRate.length; i++) {
      if (!inHigh && flowRate[i] > bb_up[i] && flowRate[i - 1] < bb_up[i - 1]) {
        inHigh = true;
        peaks[i] = 1;
      } else if (inHigh && flowRate[i] < sma[i] && flowRate[i - 1] > sma[i - 1]) {
        inHigh = false;
      } else if (inHigh) {
        peaks[i] = 1;
      }
    }
    return peaks;
  };

  // If data is not loaded, show a loading message
  if (!data) {
    return <div>Loading...</div>;
  }

  // Filter the data based on time range
  const filteredData = data.time.map((time, index) => ({
    time: time,
    flowRate: data.flowRate[index],
    peaks: data.peaks[index],
  })).filter(item => {
    const currentTime = new Date(item.time);
    return currentTime >= startTime && currentTime <= endTime;
  });

  // Prepare data for Plotly
  const flowRateTrace = {
    x: filteredData.map(row => row.time),
    y: filteredData.map(row => row.flowRate),
    mode: 'lines',
    name: 'Flow Rate (m³/s)',
    line: { color: 'blue' },
  };

  // Prepare a single trace for all peak regions
  const peakTrace = {
    x: [],
    y: [],
    mode: 'lines',
    name: 'Peak Region',
    line: { color: 'red' },
    showlegend: true, // Show a single legend entry for peaks
  };

  let peakStart = null;
  for (let i = 1; i < filteredData.length; i++) {
    if (filteredData[i].peaks === 1 && peakStart === null) {
      peakStart = i;
    } else if (filteredData[i].peaks === 0 && peakStart !== null) {
      peakTrace.x = [...peakTrace.x, ...filteredData.slice(peakStart, i).map(row => row.time)];
      peakTrace.y = [...peakTrace.y, ...filteredData.slice(peakStart, i).map(row => row.flowRate)];
      peakStart = null;
    }
  }
  if (peakStart !== null) {
    peakTrace.x = [...peakTrace.x, ...filteredData.slice(peakStart).map(row => row.time)];
    peakTrace.y = [...peakTrace.y, ...filteredData.slice(peakStart).map(row => row.flowRate)];
  }

  // Return the Plotly graph
  return (
    <Plot
      data={[flowRateTrace, peakTrace]}
      layout={{
        title: 'Flow Rate with Peak Regions in Red',
        xaxis: { title: 'Time (Hours)' },
        yaxis: { title: 'Flow Rate (m³/s)' },
        template: 'plotly_dark',
      }}
    />
  );
};

export default FlowRateGraph;
