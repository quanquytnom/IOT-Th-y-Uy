import React, { useState } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetActionHistorysQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const ActionHistory = () => {
    const theme = useTheme();
    // values to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState({ "field": "createdAt", "sort": "desc" });
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const { data: rawData, isLoading } = useGetActionHistorysQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    let data = rawData;

    if (data) {
        data = {
            ...data,
            actionHistory: data.actionHistory.map((actionHistory) => {
                const formattedDate = new Intl.DateTimeFormat('vi-VN', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                }).format(new Date(actionHistory.createdAt));

                return {
                    ...actionHistory,
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
            field: "deviceName",
            headerName: "Device",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            valueGetter: (params) => {
                // Thay đổi giá trị "on" và "off" thành "Turn on" và "Turn off"
                if (params.value === "on") {
                    return "Turn on";
                } else if (params.value === "off") {
                    return "Turn off";
                }
                return params.value;
            }
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="ACTIONS HISTORY" subtitle="Entire list of changes in devices" />
            <Box
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        backgroundColor: theme.palette.background.alt, // Màu nền của hàng dữ liệu
                        color: theme.palette.secondary[200], // Thay đổi màu chữ sang đậm hơn (secondary[200]) để dễ đọc
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.primary.light, // Đổi màu header thành xám
                        color: theme.palette.secondary[100], // Màu chữ của header
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.primary.light, // Đổi màu footer thành xám
                        color: theme.palette.secondary[100], // Màu chữ của footer
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.background.alt, // Màu nền của dữ liệu
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.actionHistory) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
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

export default ActionHistory;
