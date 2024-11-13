import React, { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  DeviceThermostatOutlined,
  WaterDrop,
  WbSunny,
  Air,
  WindPower,
  Lightbulb,
  AcUnit,
  Tv
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StatBox from "components/StatBox";
import SensorChart from "components/SensorChart";
import DeviceController from "components/DeviceController";
import { useGetActionHistorysQuery, useGetDataSensorsQuery } from "state/api";

import airConditionerStatic from "assets/air-conditioner.png";
import airConditionerGif from "assets/air-conditioner.gif";
import fanStaic from "assets/fan.png";
import fanGif from "assets/fan.gif";
import lightStatic from "assets/ceiling-lamp.png"
import lightGif from "assets/ceiling-lamp.gif"
import tvStatic from "assets/tv.png"
import tvGif from "assets/tv.gif"

import temperatureIcon from "assets/thermometer.gif"
import brightIcon from "assets/brightness.gif"
import humidityIcon from "assets/humidity.gif"
import dustIcon from "assets/dust.gif"

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const defaultDeviceStatus = 'off';

  const PRIMARY_RED = "ffc7c5" //for temperature
  const PRIMARY_BLUE = "c5e5ff" // for humidity
  const PRIMARY_YELLOW = "fff09d" // for light
  const PRIMARY_GREEN = "#86B5B7" //  for dust

  // Hàm để lấy màu border dựa trên giá trị của stat và value
  const getBorderColor = (stat, value) => {
    if (stat === "temperature") {
      if (value < 20) return "#FFB6B3"; // đỏ nhạt
      else if (value >= 20 && value < 25) return "#FF9994"; // đỏ pastel nhạt hơn
      else if (value >= 25 && value < 30) return "#FF6B66"; // đỏ trung bình
      else if (value >= 30 && value < 35) return "#FF4A3E"; // đỏ đậm
      else return "#FF1F0F"; // đỏ tối sẫm
    }

    if (stat === "humidity") {
      if (value < 20) return "#B3D9FF"; // xanh nhạt nhất
      else if (value >= 20 && value < 40) return "#99C7FF"; // xanh nhạt hơn
      else if (value >= 40 && value < 60) return "#66A3FF"; // xanh trung bình
      else if (value >= 60 && value < 80) return "#3380FF"; // xanh đậm hơn
      else return "#0060FF"; // xanh đậm nhất
    }

    if (stat === "light") {
      if (value < 800) return "#FFF8DC"; // vàng nhạt
      else if (value >= 800 && value < 1500) return "#FFE699"; // vàng pastel nhạt hơn
      else if (value >= 1500 && value < 2000) return "#FFD700"; // vàng trung bình
      else if (value >= 2000 && value < 2500) return "#FFC300"; // vàng đậm hơn
      else return "#FFB300"; // vàng tối sẫm
    }

    if (stat === "dust") {
      if (value < 100) return "#B7E3D8"; // xanh nhạt
      else if (value >= 100 && value < 200) return "#86CDB7"; // xanh pastel nhạt hơn
      else if (value >= 200 && value < 300) return "#5EAF9D"; // xanh trung bình
      else if (value >= 300 && value < 400) return "#3D967E"; // xanh đậm hơn
      else return "#26715F"; // xanh đậm nhất
    }

    // Màu mặc định nếu không thuộc các loại trên
    return "#FFFFFF";
  };


  // Lấy dữ liệu trạng thái thiết bị
  const { data: fanData, isLoading: isLoadingFan } = useGetActionHistorysQuery({
    page: 0,
    pageSize: 1,
    sort: JSON.stringify({ "field": "createdAt", "sort": "desc" }),
    search: "Fan",
  });

  const fanStatus = isLoadingFan ? localStorage.getItem('fanStatus') || defaultDeviceStatus : fanData?.actionHistory[0]?.action;

  const { data: lightData, isLoading: isLoadingLight } = useGetActionHistorysQuery({
    page: 0,
    pageSize: 1,
    sort: JSON.stringify({ "field": "createdAt", "sort": "desc" }),
    search: "Light",
  });

  const lightStatus = isLoadingLight ? localStorage.getItem('lightStatus') || defaultDeviceStatus : lightData?.actionHistory[0]?.action;

  const { data: acData, isLoading: isLoadingAC } = useGetActionHistorysQuery({
    page: 0,
    pageSize: 1,
    sort: JSON.stringify({ "field": "createdAt", "sort": "desc" }),
    search: "AC",
  });

  const acStatus = isLoadingAC ? localStorage.getItem('acStatus') || defaultDeviceStatus : acData?.actionHistory[0]?.action;

  const { data: tvData, isLoading: isLoadingTV } = useGetActionHistorysQuery({
    page: 0,
    pageSize: 1,
    sort: JSON.stringify({ "field": "createdAt", "sort": "desc" }),
    search: "Television",
  });

  const tvStatus = isLoadingTV ? localStorage.getItem('tvStatus') || defaultDeviceStatus : tvData?.actionHistory[0]?.action;

  // Cập nhật trạng thái thiết bị vào localStorage
  useEffect(() => {
    if (fanData) {
      const status = fanData.actionHistory[0]?.action || defaultDeviceStatus;
      localStorage.setItem('fanStatus', status);
    }

    if (lightData) {
      const status = lightData.actionHistory[0]?.action || defaultDeviceStatus;
      localStorage.setItem('lightStatus', status);
    }

    if (acData) {
      const status = acData.actionHistory[0]?.action || defaultDeviceStatus;
      localStorage.setItem('acStatus', status);
    }

    if (tvData) {
      const status = tvData.actionHistory[0]?.action || defaultDeviceStatus;
      localStorage.setItem('tvStatus', status);
    }
  }, [fanData, lightData, acData, tvData]);

  // State để lưu dữ liệu cảm biến
  const [sensorValues, setSensorValues] = useState({
    temperature: 'N/A',
    humidity: 'N/A',
    light: 'N/A',
    dust: 'N/A',
  });

  // Lấy dữ liệu cảm biến
  const { data: sensorData, isLoading: isLoadingSensors, refetch } = useGetDataSensorsQuery({
    page: 0,
    pageSize: 10,
    sort: JSON.stringify({ field: "createdAt", sort: "desc" }),
    search: "",
  });

  // Cập nhật state cho dữ liệu cảm biến
  useEffect(() => {
    if (!isLoadingSensors && sensorData) {
      setSensorValues({
        temperature: sensorData?.dataSenSors[0]?.temperature || 'N/A',
        humidity: sensorData?.dataSenSors[0]?.humidity || 'N/A',
        light: sensorData?.dataSenSors[0]?.light || 'N/A',
        dust: sensorData?.dataSenSors[0]?.dust || 'N/A',
      });
      console.log("Sensor data updated!");
      console.log(sensorData);
    }
  }, [sensorData, isLoadingSensors]);

  // Cập nhật dữ liệu cảm biến mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Fetching new sensor data...");
      refetch(); // Gọi lại truy vấn dữ liệu cảm biến
    }, 5000);

    return () => clearInterval(interval); // Dọn dẹp khi component bị unmounted
  }, [refetch]);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* Row 1: StatBox */}
        <StatBox
          title="Temperature"
          value={`${sensorValues.temperature} °C`}
          icon={
            <img src={temperatureIcon} alt="Temperature Icon" style={{ width: "80px", height: "80px" }} />
          }
          borderColor={getBorderColor("temperature", sensorValues.temperature)}
        />
        <StatBox
          title="Humidity"
          value={`${sensorValues.humidity} g/m³`}
          icon={
            <img src={humidityIcon} alt="Humidity Icon" style={{ width: "80px", height: "80px" }} />
          }
          borderColor={getBorderColor("humidity", sensorValues.humidity)}
        />
        <StatBox
          title="Light"
          value={`${sensorValues.light} lx`}
          icon={
            // <WbSunny
            //   sx={{ color: theme.palette.secondary[300], fontSize: "52px" }}
            // />
            <img src={brightIcon} alt="Brightness Icon" style={{ width: "80px", height: "80px" }} />
          }
          borderColor={getBorderColor("light", sensorValues.light)}
        />
        <StatBox
          title="Dust"
          value={`${sensorValues.dust} AQI⁺`}
          icon={<img src={dustIcon} alt="Dust Icon" style={{ width: "80px", height: "80px" }} />}
          borderColor={getBorderColor("dust", sensorValues.dust)}
        />

        {/* Row 2 Chart + DeviceController */}
        {/* Chart */}
        <Box
          gridColumn="span 9"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="3rem"
          boxShadow={`0px 6px 12px ${theme.palette.neutral.grey[700]}`}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          </Typography> */}
          <SensorChart data={sensorValues} sx={{ boxShadow: "c2c2c2" }} />
        </Box>





        {/* DeviceController */}
        {/* <Box  gridColumn="span 3" gridRow="span 1">
          <Typography
            variant="h2"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Device Controller
          </Typography>
          <Typography variant="h3" color={theme.palette.secondary[300]}>
            Click on it to turn on/off
          </Typography>
        </Box> */}

        {/* Television */}
        <Box display="flex" gap="1.5rem" gridColumn="span 3" gridRow="span 1">
          <DeviceController
            deviceName="Television"
            staticIcon={<img src={tvStatic} alt="TV Icon" style={{ width: "80px", height: "80px" }} />}
            dynamicIcon={<img src={tvGif} alt="TV Icon" style={{ width: "120px", height: "120px" }} />}
            deviceStatus={tvStatus}
          />
        </Box>

        {/* AC */}
        <Box display="flex" gap="1.5rem" gridColumn="span 3" gridRow="span 1">
          <DeviceController
            deviceName="AC"
            staticIcon={<img src={airConditionerStatic} alt="AC Icon" style={{ width: "80px", height: "80px" }} />}
            dynamicIcon={<img src={airConditionerGif} alt="AC Icon" style={{ width: "120px", height: "120px" }} />}
            deviceStatus={acStatus}
          />
        </Box>

        {/* Light */}
        <Box display="flex" gap="1.5rem" gridColumn="span 3" gridRow="span 1">
          <DeviceController
            deviceName="Light"
            staticIcon={<img src={lightStatic} alt="Light Icon" style={{ width: "80px", height: "80px" }} />}
            dynamicIcon={<img src={lightGif} alt="Light Icon" style={{ width: "120px", height: "120px" }} />}
            deviceStatus={lightStatus}
          />
        </Box>




        {/* Fan */}
        {/* <Box display="flex" gap="1.5rem" gridColumn="span 3" gridRow="span 1">
          <DeviceController
            deviceName="Fan"
            staticIcon={<img src={fanStaic} alt="Fan Icon" style={{ width: "80px", height: "80px" }} />}
            dynamicIcon={<img src={fanGif} alt="Fan Icon" style={{ width: "120px", height: "120px" }} />}
            deviceStatus={fanStatus}
          />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
