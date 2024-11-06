import React, { useState } from 'react'
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDataSensorsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";


const DataSensor = () => {
    const theme = useTheme();
    // values to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    // default sort is by createdAt in descending order
    const [sort, setSort] = useState({"field": "createdAt", "sort": "desc"});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading } = useGetDataSensorsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    // Transforming data for better readability
    let transformedData = data;

    if (data) {
        transformedData = {
            ...data,
            dataSenSors: data.dataSenSors.map((dataSenSor) => {
                const formattedDate = new Intl.DateTimeFormat('vi-VN', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                }).format(new Date(dataSenSor.createdAt));
        
                return {
                    ...dataSenSor,
                    createdAt: formattedDate,
                };
            }),
        };
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "temperature",
            headerName: "Temperature",
            flex: 1,
        },
        {
            field: "light",
            headerName: "Light",
            flex: 1,
        },
        {
            field: "humidity",
            headerName: "Humidity",
            flex: 1,
        },
        {
            field: "dust",
            headerName: "Dust",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="DATA SENSOR" subtitle="Entire list of logs from sensors" />
            <Box
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        backgroundColor: theme.palette.background.alt, // Set background of rows
                        color: theme.palette.secondary[200], // Change text color for better readability
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.primary.light, // Set background color of headers to grey
                        color: theme.palette.secondary[100], // Header text color
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.primary.light, // Set background color of footer to grey
                        color: theme.palette.secondary[100], // Footer text color
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.background.alt, // Background color for data rows
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(transformedData && transformedData.dataSenSors) || []}
                    columns={columns}
                    rowCount={(transformedData && transformedData.total) || 0}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    );
}

export default DataSensor;
