import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { useTheme } from "@mui/material";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleOpenModal}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>

      {/* Modal Component */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: 'blur(10px)',
          },
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.6)",
              borderRadius: "2rem",
              width: "80%",
              height: "auto",
              maxHeight: "90%",
              boxShadow: 24,
              p: 4,
              overflowY: 'auto',
              backdropFilter: 'blur(20px)',
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
          >
            {/* Modal Header */}
            <Box display="flex" mb="2rem" alignItems="center">
              {/* Left Part: Profile Picture */}
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="200px"
                width="200px"
                borderRadius="2rem"
                sx={{ objectFit: "cover", marginRight: '2rem' }}
              />

              {/* Right Part: User Name */}
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  mb="0.5rem"
                >
                  Trương Hải Quân
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                >
                  @B21DCAT158
                </Typography>
              </Box>
            </Box>

            {/* Personal Information */}
            <Box mb="2rem" p="2rem" borderRadius="1.5rem" bgcolor="rgba(255, 255, 255, 0.8)" boxShadow="0 4px 10px rgba(0,0,0,0.1)">
              <Typography variant="h4" fontWeight="bold" mb="1.5rem">
                Personal Information
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <Typography variant="body1"><strong>Name:</strong> Trương Hải Quân</Typography>
                <Typography variant="body1"><strong>Date of Birth:</strong> 22/10/2003</Typography>
                <Typography variant="body1"><strong>Email:</strong> quanth.b21at158@stu.ptit.edu.vn</Typography>
                <Typography variant="body1"><strong>Phone:</strong> 0859428896</Typography>
              </Box>
            </Box>

            {/* Project Information */}
            <Box p="2rem" borderRadius="1.5rem" bgcolor="rgba(255, 255, 255, 0.8)" boxShadow="0 4px 10px rgba(0,0,0,0.1)">
              <Typography variant="h4" fontWeight="bold" mb="1.5rem">
                Project Information
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <Typography variant="body1"><strong>Project Name:</strong> IoT Thầy Uy - N06</Typography>
                <Typography variant="body1">
                  <strong>GitHub Link:</strong> <a href="https://github.com/example/iot" target="_blank" rel="noopener noreferrer">https://github.com/example/iot-control</a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

    </AppBar>
  );
};

export default Navbar;
