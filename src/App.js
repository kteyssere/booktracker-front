import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from "styled-components";
import {Card, Paragraph, Divider, Button, InputText, Clock} from './components/atoms';
import { styled } from "styled-components";
import {
  FaCarrot,
  FaLemon,
  FaPepperHot,
  FaPersonBooth,
  FaUser,
} from "react-icons/fa";
import { Menu } from "./components/organisms";
import { MenuButton } from "./components/molecules";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import HttpExample from "./components/atoms/HttpExample/HttpExample";

const invert = ({ primary, secondary }) => ({
  primary: secondary,
  secondary: primary,
});
const AppContainer = styled.div`

@media screen and (max-width: 800px){
  
}
`
const AppContent = styled.div`

position: absolute;
width: 70vw;
height: 90vh;
left: 440px;
top: 38px;
padding-right: 10px;

@media screen and (max-width: 800px){
  width: 90vw;
  height: 90vh;

  left: 16px;
  top: 135px;
  padding-bottom: 10px;
}

`


const menuData = [
  {
    icon: <FaPepperHot></FaPepperHot>,
    text: "Chili",
    data: "chili",
  },
  {
    icon: <FaCarrot></FaCarrot>,
    text: "Carrot",
    data: "carrot",
  },
  {
    icon: <FaLemon></FaLemon>,
    text: "Lemon",
    data: "lemon",
  },
];



function App() {
  const [page, setPage] = useState("lemon");

  const renderPage = () => {
    switch (page) {
      case "carrot":
        return (
          <div>
            <Clock/>
          </div>
        );
        break;
      case "lemon":
        return <div>Lemon</div>;
        break;

      default:
      case "chili":
        return <div>Chilly</div>;
        break;
    }
  };

  const handler = (pageName) => {
    setPage(pageName);
  };

  return (
    <>
    <div className='App'>
   
    <HttpExample></HttpExample>
      <AppContainer>
      <Menu data={menuData} handler={handler}></Menu>
      <InputText/>
      {renderPage()}
  
        {/* <AppSidenav>
          <Card></Card>
        </AppSidenav> */}
        <AppContent>
          <Card>
            
          </Card>
        </AppContent>
      </AppContainer>
    </div>
    </>
  );
}

export default App;
