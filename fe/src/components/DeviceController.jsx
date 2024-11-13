import React, { useState } from 'react';
import { Box, Typography, useTheme, CircularProgress, Snackbar } from '@mui/material';
import { usePostActionHistoryMutation } from 'state/api';

const DeviceController = ({ deviceName, staticIcon, dynamicIcon, deviceStatus }) => {
    const theme = useTheme();
    const [isOn, setIsOn] = useState(deviceStatus === 'on');
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    // console.log('color check')
    // console.log(theme.palette.neutral.grey[700])
    // Mutation hook for POST request
    const [postActionHistory] = usePostActionHistoryMutation();

    const handleToggle = async () => {
        setLoading(true);
        try {
            // Toggle local state first for better UX
            const action = isOn ? 'off' : 'on';
            await postActionHistory({ deviceName, action }).unwrap();
            setIsOn(!isOn);
        } catch (error) {
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            onClick={handleToggle}
            sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem',
                backgroundColor: theme.palette.background.alt,
                borderRadius: '1.5rem',
                border: `2px solid ${theme.palette.background.default}`,
                height: '100%',
                width: '100%',
                boxShadow: `0px 6px 20px ${isOn ? theme.palette.success.light : theme.palette.neutral.grey[700]}`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: `0px 8px 24px ${isOn ? theme.palette.success.light : theme.palette.grey[400]}`,
                    transform: 'scale(1.05)',
                },
                '&:active': {
                    transform: 'scale(0.98)',
                },
            }}
        >
            {/* Nửa trái: Device Name và Status */}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                width="50%"
                pr="1rem"
            >
                <Typography variant="h4" sx={{ color: theme.palette.secondary[100], marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    {deviceName}
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        color: isOn ? theme.palette.success.main : theme.palette.error.main,
                        fontWeight: 'bold',
                    }}
                >
                    {isOn ? 'On' : 'Off'}
                </Typography>
            </Box>

            {/* Nửa phải: Icon của thiết bị (Dynamic hoặc Static dựa trên trạng thái) */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="50%"
                p="1.5rem"
                transition="transform 0.3s ease-in-out"
            >
                {loading ? (
                    <CircularProgress size={48} />
                ) : (
                    isOn ? dynamicIcon : staticIcon
                )}
            </Box>

            {/* Snackbar for error handling */}
            <Snackbar
                open={showError}
                autoHideDuration={4000}
                onClose={() => setShowError(false)}
                message="Failed to update device status"
            />
        </Box>
    );
};

export default DeviceController;
