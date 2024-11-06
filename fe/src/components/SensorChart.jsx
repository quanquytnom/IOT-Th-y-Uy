import React, { useEffect, useRef } from "react";
import { useTheme, Box } from "@mui/material";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

// Register necessary Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const SensorChart = ({ data }) => {
  const theme = useTheme();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Initial Data Configuration (mock data)
  const initialData = {
    labels: [], // Start with empty labels
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        fill: false,
        borderColor: "#FFA726",
        cubicInterpolationMode: "monotone",
        pointRadius: 4,
        pointHoverRadius: 7,
        yAxisID: "y", // Chỉ định trục Y mặc định
      },
      {
        label: "Light (lx)",
        data: [],
        fill: false,
        borderColor: "#29B6F6",
        cubicInterpolationMode: "monotone",
        pointRadius: 4,
        pointHoverRadius: 7,
        yAxisID: "y1", // Sử dụng trục Y thứ hai
      },
      {
        label: "Humidity (g/m³)",
        data: [],
        fill: false,
        borderColor: "#66BB6A",
        cubicInterpolationMode: "monotone",
        pointRadius: 4,
        pointHoverRadius: 7,
        yAxisID: "y",
      },
      {
        label: "Dusk (AQI⁺)",
        data: [],
        fill: false,
        borderColor: "#EF5350",
        cubicInterpolationMode: "monotone",
        pointRadius: 4,
        pointHoverRadius: 7,
        yAxisID: "y",
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
          duration: 1000, // Thời gian chuyển động khi cập nhật dữ liệu (mượt mà hơn)
          easing: 'easeInOutCubic', // Hiệu ứng chuyển động 
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
            text: "Sensor Data",
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
              autoSkip: true, // Tự động bỏ qua nhãn nếu cần thiết
              maxRotation: 0, // Đảm bảo các nhãn nằm ngang
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
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: theme.palette.secondary[200], // Y-axis labels color
            },
            title: {
              display: true,
              text: "Temperature, Humidity, Dusk",
              color: theme.palette.secondary[200], // Title text for left y-axis
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
              color: theme.palette.secondary[200], // Y1-axis labels color
            },
            grid: {
              drawOnChartArea: false, // Ngăn không cho lưới của trục y1 đè lên lưới của trục y
            },
            title: {
              display: true,
              text: "Light",
              color: "#29B6F6", // Đặt màu giống với dataset của Light để dễ nhận biết
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
      }
    });


    return () => {
      chartInstance.current.destroy();
    };
  }, [theme]);

  // useEffect to update chart data in real-time
  useEffect(() => {
    if (chartInstance.current) {
      // Update datasets with new data
      chartInstance.current.data.datasets[0].data.push(data.temperature);
      chartInstance.current.data.datasets[1].data.push(data.light);
      chartInstance.current.data.datasets[2].data.push(data.humidity);
      chartInstance.current.data.datasets[3].data.push(data.dust);

      // Get current time and format it as HH:MM:SS
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // Keep the latest 7 points (simulating real-time data shift)
      if (chartInstance.current.data.labels.length >= 7) {
        chartInstance.current.data.labels.shift();
        chartInstance.current.data.datasets.forEach((dataset) => dataset.data.shift());
      }

      // Add new label for each new data point
      chartInstance.current.data.labels.push(formattedTime);

      chartInstance.current.update(); // Update the chart
    }
  }, [data]);

  return (
    <Box width="100%" height="100%">
      <canvas ref={chartRef}></canvas>
    </Box>
  );
};

export default SensorChart;