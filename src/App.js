import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "views/homePage/index";
import LoginPage from "views/loginPage/login";
import ProfilePage from "views/profilePage/profile";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home" element={<HomePage />}
            />
            <Route
              path="/profile/:userId" element={<ProfilePage/>}
            />
          </Routes>
          </ThemeProvider>
          </BrowserRouter>
    </div>
  );
}

export default App;