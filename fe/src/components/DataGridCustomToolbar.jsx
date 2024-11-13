// import React from "react";
// import { Search } from "@mui/icons-material";
// import { IconButton, TextField, InputAdornment } from "@mui/material";
// import {
//   GridToolbarDensitySelector,
//   GridToolbarContainer,
//   GridToolbarExport,
//   GridToolbarColumnsButton,
// } from "@mui/x-data-grid";
// import FlexBetween from "./FlexBetween";

// const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
//   return (
//     <GridToolbarContainer>
//       <FlexBetween width="100%">
//         <FlexBetween>
//           <GridToolbarColumnsButton />
//           <GridToolbarDensitySelector />
//           <GridToolbarExport />
//         </FlexBetween>
//         <TextField
//           label="Search..."
//           sx={{ mb: "0.5rem", width: "15rem" }}
//           onChange={(e) => setSearchInput(e.target.value)}
//           value={searchInput}
//           variant="standard"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={() => {
//                     setSearch(searchInput);
//                     setSearchInput("");
//                   }}
//                 >
//                   <Search />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </FlexBetween>
//     </GridToolbarContainer>
//   );
// };

// export default DataGridCustomToolbar;

import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, Box } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  applySearch
}) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>

        <Box display="flex" alignItems="center" gap="1rem">
          {/* Start Date Picker */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={endDate ? endDate : new Date()} // Prevent future dates
            placeholderText="Start Date"
            dateFormat="dd/MM/yyyy"
          />

          {/* End Date Picker */}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate} // Prevent selecting before start date
            maxDate={new Date()} // Prevent future dates
            placeholderText="End Date"
            dateFormat="dd/MM/yyyy"
          />

          {/* Search Input */}
          <TextField
            label="Search..."
            sx={{ mb: "0.5rem", width: "15rem" }}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            variant="standard"
          />

          {/* Search Button with Magnifying Glass Icon */}
          <IconButton
            onClick={() => applySearch()}
            color="primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f0f0f0', // Background color for button
              color: '#333', // Text color
              padding: '8px 16px', // Padding to make it look like a button
              borderRadius: '4px', // Rounded corners
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Initial shadow for 3D effect
              transition: 'all 0.3s ease-in-out', // Smooth transition

              '&:hover': {
                backgroundColor: '#e0e0e0', // Slightly darker on hover
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', // Elevated shadow on hover
              },
              '&:active': {
                backgroundColor: '#d0d0d0', // Darker background on click
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Reduced shadow for pressed effect
                transform: 'scale(0.98)', // Slightly smaller on click
              },
            }}
          >
            Search
            <Search sx={{ marginLeft: '8px' }} />
          </IconButton>

        </Box>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
