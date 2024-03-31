import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider, styled } from "styled-components";
import { Menu } from "./components/organisms";
import { NightModeProvider } from "./contexts";
import { FaHome, FaBook, FaGlobe, FaComments } from "react-icons/fa";
import { store } from './store';
import { Provider } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, refreshAuthToken } from "./providers/AuthProvider/AuthProvider";
import { jwtDecode } from 'jwt-decode';



/**
 * Style
 */
const AppContainer = styled.div`
background: ${(props) => props.theme.primary}
color: ${(props) => props.theme.secondary}
height: 100vh;
width: 100vw;
display: flex;

margin: 0 10px 0 10px;
gap: 10px;
flex-flow: row wrap;

@media screen and (max-width: 800px){
  flex-flow: column wrap;
  margin: 0 10px 0 3px;
}
`
const AppContent = styled.div`
flex:9;
height: 95vh;
margin-right: 20px;

@media screen and (max-width: 800px){
  height: 100vh;
  padding-bottom: 10px;
}
`

const night = {
  primary: "#dcb6ab",
  secondary: "#212437cd"
};

const day = {
  primary: "white",
  secondary: "#886f68cc"
};

/**
 * Menu link
 */
const menuData = [
  {
    icon: <FaHome></FaHome>,
    text: "Home",
    slug: "/",
  },
  {
    icon: <FaBook></FaBook>,
    text: "Bookshelf",
    slug: "bookshelf",
  },
  {
    icon: <FaGlobe></FaGlobe>,
    text: "Explore",
    slug: "explore",
  },
  {
    icon: <FaComments></FaComments>,
    text: "Discussions",
    slug: "discussions",
  }
];

const useTokenExpiration = (token) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

    const timeout = setTimeout(() => {
      const now = Date.now();
      if (now >= expirationTime) {
        setIsTokenExpired(true);
      }
    }, 1000); // Check expiration every second

    return () => clearTimeout(timeout);
  }, [token]);

  return isTokenExpired;
}



function App() {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isNightMode, setIsNightMode] = useState(getCurrentTheme());
  const invert = () => (isNightMode ? night : day);
  const { token, refreshToken, setToken } = useAuth();
  const isTokenExpired = useTokenExpiration(token);

  useEffect(() => {
    if (isTokenExpired) {
      const newTkn = refreshAuthToken(localStorage.getItem("refreshToken"));
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      setToken(newTkn);
    }
  }, [isTokenExpired]);

  // if there's a user show the message below
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={invert(isNightMode)}>
          <NightModeProvider
            value={{
              changeNightMode: () => {
                setIsNightMode(!isNightMode);
              },
              nightMode: isNightMode,
            }}
          >
            <AppContainer>
              <Menu data={menuData}>
              </Menu>
              <AppContent>
                <Outlet />
              </AppContent>
            </AppContainer>
          </NightModeProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
