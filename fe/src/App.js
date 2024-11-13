import { CssBaseline, ThemeProvider,  } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scences/layout";
import Dashboard from "scences/dashboard";
import DataSensor from "scences/dataSensor";
import ActionHistory from "scences/actionHistory";
import Bai5 from "./scences/Bai5";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        {/* //setup for material ui theme */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/*Every route will be wrapped in the Layout component */}
            <Route element={<Layout/>}>
              {/* redirect to dashboard, as the default route */}
              <Route path='/' element={<Navigate to="/dashboard" replace/>} />
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/datasensor' element={<DataSensor/>} />
              <Route path='/actionhistory' element={<ActionHistory/>} />
              <Route path='/bai5' element={<Bai5/>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
