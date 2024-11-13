import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";

const StatBox = ({ title, value, borderColor, icon, customHeight }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/datasensor");
    };

    return (
        <Box
            height={customHeight ? customHeight : "100%"}
            gridColumn="span 3"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            // in center of the box
            alignItems="center"
            justifyContent="center"
            //padding: top right bottom left
            padding="0.5rem"
            flex="1 1 100%"
            // backgroundColor={theme.palette.background.alt}
            backgroundColor={borderColor}
            borderRadius="2rem"
            //   borderStyle="solid"
            //   boderwidth="10px"
            sx={{
                border: `0.5px solid ${borderColor}`,
                borderColor: { borderColor },
                boxShadow: `0px 4px 12px ${borderColor}`,
                cursor: 'pointer', // Đổi con trỏ thành pointer khi hover vào StatBox
                transition: 'all 0.3s ease-in-out', // Thêm hiệu ứng chuyển động khi hover
                '&:hover': {
                    boxShadow: `0px 8px 24px ${borderColor}`, // Thêm hiệu ứng shadow khi hover
                    transform: 'scale(1.05)', // Thêm hiệu ứng phóng to khi hover
                },
                '&:active': {
                    transform: 'scale(0.98)', // Giảm kích thước một chút khi click vào
                },
            }}
            onClick={handleClick}
        >
            <Box
                // the box spread its container
                width="100%"
                height="100%"
                px="2rem"
                py="1rem"
                display="flex" // Sử dụng flexbox để căn giữa
                alignItems="center" // Căn giữa theo trục Y
                backgroundColor={theme.palette.background.alt}
                borderRadius="1.5rem"
            >
                <FlexBetween width="100%">
                    {/* Khối bên trái */}
                    <Box>
                        <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
                            {title}
                        </Typography>
                        <Typography
                            variant="h1"
                            fontWeight="600"
                            sx={{ color: theme.palette.secondary[200], transform: 'scale(1.2)', pl: '0.7rem' }}
                        >
                            {value}
                        </Typography>
                    </Box>

                    {/* Khối bên phải */}
                    <Box sx={{ marginLeft: '2rem', transform: 'scale(1.5)' }}>
                        {icon}
                    </Box>
                </FlexBetween>
            </Box>

        </Box >
    );
};

export default StatBox;