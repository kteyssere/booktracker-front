import React, { useState } from 'react'
import { Login } from '../../components/organisms';
import { ThemeProvider } from "styled-components";
import { NightModeProvider } from "../../contexts";

const night = {
  primary: "#dcb6ab",
  secondary: "#212437cd"
};

const day = {
  primary: "white",
  secondary: "#886f68cc"
};

const LoginPage = () => {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isNightMode, setIsNightMode] = useState(getCurrentTheme());
  const invert = () => (isNightMode ? night : day);

  return <ThemeProvider theme={invert(isNightMode)}>
    <NightModeProvider
      value={{
        changeNightMode: () => {
          setIsNightMode(!isNightMode);
        },
        nightMode: isNightMode,
      }}
    >
      <Login></Login>
    </NightModeProvider>
  </ThemeProvider>
};

export default LoginPage;