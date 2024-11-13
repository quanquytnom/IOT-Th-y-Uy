import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import StatBox from "components/StatBox";
import Bai5Chart from "components/Bai5Chart";
import { useGetDataSensorsQuery } from "state/api";
import Header from "components/Header";

import WarningStatic from "assets/alert.png";
import WarningDynamic from "assets/alert.gif";
import WindIcon from "assets/wind.gif"

const Bai5 = () => {
    const theme = useTheme();

    // State to store sensor values
    const [sensorValues, setSensorValues] = useState({
        dust: "N/A",
    });

    // Fetch sensor data (using same API as Dashboard)
    const { data: sensorData, isLoading: isLoadingSensors, refetch } = useGetDataSensorsQuery({
        page: 0,
        pageSize: 10,
        sort: JSON.stringify({ field: "createdAt", sort: "desc" }),
        search: "",
    });

    // Update state when sensor data is fetched
    useEffect(() => {
        if (!isLoadingSensors && sensorData) {
            setSensorValues({
                dust: sensorData?.dataSenSors[0]?.dust || "N/A",
            });
            console.log("Sensor data updated!, bai5");
            console.log(sensorData);
        }
    }, [sensorData, isLoadingSensors]);

    // UseEffect to refetch data every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Fetching new sensor data...");
            refetch(); // Gọi lại truy vấn dữ liệu cảm biến
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval when component unmounts
    }, [refetch]);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="BÀI 5" subtitle="Real-time Stat, Chart and Warning about Windspeed" />
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="stretch"
            paddingTop="2rem"
            backgroundColor={theme.palette.background.default}
            height="400px" // Tăng chiều cao tổng của container
        >
            {/* StatBox for Windspeed */}
            <Box
                flex="1" // StatBox chiếm 1 phần
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%" // Đảm bảo chiều cao đầy đủ
            >
                <StatBox
                    title="Windspeed"
                    value={`${sensorValues.dust} m/s`}
                    icon={<img src={WindIcon} alt="Wind Icon" style={{ width: "80px", height: "80px" }} />}
                    borderColor={theme.palette.secondary[300]}
                />
            </Box>

            {/* Chart Box using Bai5Chart */}
            <Box
                flex="2" // Chart Box chiếm 2 phần
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%" // Đảm bảo chiều cao đầy đủ
                backgroundColor={theme.palette.background.alt}
                borderRadius="1.5rem"
                p="1rem"
                m="0 1rem" // Thêm margin giữa các phần
                border={`2px solid ${theme.palette.background.default}`}
            >
                <Bai5Chart data={sensorValues} />
            </Box>

            {/* Dynamic Box (Windspeed Indicator) */}
            <Box
                flex="1" // Dynamic Box chiếm 1 phần
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "2rem",
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "1.5rem",
                    border: `2px solid ${theme.palette.background.default}`,
                    height: "100%", // Đảm bảo chiều cao đầy đủ
                    width: "100%",
                    // Thay đổi shadow và hiệu ứng khi "dust" >= 60
                    // boxShadow: sensorValues.dust >= 60
                    //     ? `0px 6px 20px ${theme.palette.error.light}`
                    //     : `0px 6px 20px ${theme.palette.grey[10]}`,
                    transition: "all 0.3s ease-in-out",
                    // animation khi "dust" >= 60
                    animation: sensorValues.dust >= 60 ? "bounce 0.5s infinite alternate" : "none",
                    "@keyframes bounce": {
                        "0%": {
                            transform: "translateY(0)",
                            // boxShadow: `6px 18px 40px ${theme.palette.error.light}`
                            boxShadow: `0px 30px 90px ${theme.palette.error.light.replace('1)', '0.4)')}`,
                        },
                        "100%": {
                            transform: "translateY(-10px)",
                            // boxShadow: `0px 6px 20px ${theme.palette.error.light}`
                        },
                    },
                }}
            >
                {/* Icon and Status Text */}
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    width="50%"
                    pr="1rem"
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: theme.palette.secondary[100],
                            marginBottom: "0.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        Windspeed
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            color: sensorValues.dust >= 60
                                ? theme.palette.error.main
                                : theme.palette.success.main,
                            fontWeight: "bold",
                        }}
                    >
                        
                        {sensorValues.dust >= 60 ? "Danger" : "Normal"}
                    </Typography>
                </Box>

                {/* Icon: Static or Dynamic based on state */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="50%"
                    p="1.5rem"
                    transition="transform 0.3s ease-in-out"
                >
                    {sensorValues.dust >= 60 ? (
                        <img
                            src={WarningDynamic}
                            alt="Dynamic Icon"
                            style={{ width: "120px", height: "120px" }}
                        />
                    ) : (
                        <img
                            src={WarningStatic}
                            alt="Static Icon"
                            style={{ width: "80px", height: "80px" }}
                        />
                    )}
                </Box>
            </Box>

        </Box>
        </Box>
    );
};

export default Bai5;
