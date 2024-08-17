import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "views/homePage/index";
import LoginPage from "views/loginPage/login";
import ProfilePage from "views/profilePage/profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Admin from "views/Admin/Admin";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route path="/dashboard" element={<Admin />} />
          </Routes>
          </ThemeProvider>
          </BrowserRouter>
    </div>
  );
}

export default App;