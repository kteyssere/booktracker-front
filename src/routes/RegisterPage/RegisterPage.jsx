import React, {useState} from 'react'
import { Register } from '../../components/organisms';
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

const RegisterPage = () => {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isNightMode, setIsNightMode] = useState(getCurrentTheme());
  const invert = () => (isNightMode ? night : day);

  return   <ThemeProvider theme={invert(isNightMode)}>
  <NightModeProvider
    value={{
      changeNightMode: () => {
        setIsNightMode(!isNightMode);
      },
      nightMode: isNightMode,
    }}
  >
  <Register></Register>
  </NightModeProvider>
  </ThemeProvider>
}

export default RegisterPage;
