import React, { useEffect, useState } from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    Modal,
    Fade,
    Backdrop,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ReceiptLongOutlined,
    CalendarMonthOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpg";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "DataSensor",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "ActionHistory",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Bai5",
        icon: <CalendarMonthOutlined />,
    },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // set active link on page load
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        IOT
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                const lcText = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.primary[600]
                                                            : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <FlexBetween
                            textTransform="none"
                            gap="1rem"
                            m="1.5rem 2rem 0 3rem"
                            onClick={handleOpenModal}
                            sx={{ cursor: "pointer" }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px ",
                                }}
                            />
                        </FlexBetween>
                    </Box>

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
                                            <strong>GitHub Link:</strong> <a href="https://github.com/quanquytnom/IOT-Th-y-Uy" target="_blank" rel="noopener noreferrer">https://github.com/quanquytnom/IOT-Th-y-Uy</a>
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>APIs doc:</strong> <a href="http://localhost:5001/api-docs/" target="_blank" rel="noopener noreferrer">http://localhost:5001/api-docs/</a>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>


                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
