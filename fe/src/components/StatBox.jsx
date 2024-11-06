import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";

const StatBox = ({ title, value, borderColor, icon }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/datasensor");
    };

    return (
        <Box
            gridColumn="span 3"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            // in center of the box
            alignItems="center"
            justifyContent="center"
            //padding: top right bottom left
            padding="1rem"
            flex="1 1 100%"
            // backgroundColor={theme.palette.background.alt}
            backgroundColor={borderColor}
            borderRadius="3rem"
            //   borderStyle="solid"
            //   boderwidth="10px"
            sx={{
                border: `0.5px solid ${borderColor}`,
                borderColor: { borderColor },
                cursor: 'pointer', // Đổi con trỏ thành pointer khi hover vào StatBox
                transition: 'all 0.3s ease-in-out', // Thêm hiệu ứng chuyển động khi hover
                '&:hover': {
                    boxShadow: `0px 8px 24px ${theme.palette.secondary[200]}`, // Thêm hiệu ứng shadow khi hover
                    transform: 'scale(1.05)', // Thêm hiệu ứng phóng to khi hover
                },
                '&:active': {
                    transform: 'scale(0.98)', // Giảm kích thước một chút khi click vào
                },
            }}
            borderColor={borderColor}
            onClick={handleClick}
        >
            <Box
                //
                // px="6.5rem"
                // py="0.5rem"

                //the box spread its container
                width="100%"
                height="100%"
                px="2rem"
                py="1rem"
                //     alignItems="center"
                // justifyContent="center"

                backgroundColor={theme.palette.background.alt}
                borderRadius="2rem"
            >
                <FlexBetween>
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        {title}
                    </Typography>

                </FlexBetween>

                <FlexBetween>
                    <Typography
                        variant="h1"
                        fontWeight="600"
                        sx={{ color: theme.palette.secondary[200] }}
                    >
                        {value}
                    </Typography>
                    {icon}
                </FlexBetween>

            </Box>



            {/* <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween> */}
        </Box>
    );
};

export default StatBox;