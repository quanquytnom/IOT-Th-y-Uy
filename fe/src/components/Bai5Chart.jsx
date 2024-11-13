import React, { useEffect, useRef } from "react";
import { useTheme, Box } from "@mui/material";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

// Register necessary Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const Bai5Chart = ({ data }) => {
  const theme = useTheme();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Initial Data Configuration (mock data)
  const initialData = {
    labels: [], // Start with empty labels
    datasets: [
      {
        label: "Windspeed (m/s)", // Label for windspeed (using dust data)
        data: [],
        fill: false,
        borderColor: "#66BB6A", // Green color for the windspeed line
        cubicInterpolationMode: "monotone",
        pointRadius: 4,
        pointHoverRadius: 7,
      },
    ],
  };

  // useEffect to initialize chart
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: initialData,
      options: {
        responsive: true,
        animation: {
          duration: 1000, // Smooth transition time for updating data
          easing: 'easeInOutCubic', // Transition effect
        },
        plugins: {
          tooltip: {
            enabled: true,
            titleColor: theme.palette.secondary[200], // Tooltip title color
            bodyColor: theme.palette.secondary[200], // Tooltip body text color
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              color: theme.palette.secondary[200], // Legend text color
            },
          },
          title: {
            display: true,
            text: "Windspeed Data",
            color: theme.palette.secondary[200], // Title text color
            font: {
              size: 20,
              weight: 'bold',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: theme.palette.secondary[200], // X-axis labels color
              autoSkip: true,
              maxRotation: 0,
            },
            title: {
              display: true,
              text: "Time (HH:MM:SS)",
              color: theme.palette.secondary[200],
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          y: {
            ticks: {
              color: theme.palette.secondary[200], // Y-axis labels color
            },
            title: {
              display: true,
              text: "Windspeed (m/s)",
              color: theme.palette.secondary[200], // Title text color for y-axis
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.current.destroy(); // Cleanup chart instance when component unmounts
    };
  }, [theme]);

  // useEffect to update chart data in real-time
  useEffect(() => {
    if (chartInstance.current) {
      // Get current time and format it as HH:MM:SS
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // Keep the latest 7 points (simulating real-time data shift)
      if (chartInstance.current.data.labels.length >= 7) {
        chartInstance.current.data.labels.shift();
        chartInstance.current.data.datasets[0].data.shift();
      }

      // Update dataset with new data (using dust data as windspeed)
      chartInstance.current.data.datasets[0].data.push(data.dust);
      // Add new label for each new data point
      chartInstance.current.data.labels.push(formattedTime);

      chartInstance.current.update(); // Update the chart
    }
  }, [data]);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <canvas ref={chartRef}></canvas>
    </Box>
  );
};

export default Bai5Chart;