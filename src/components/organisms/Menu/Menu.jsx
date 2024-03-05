import React from "react";
import {Card} from "../../atoms"
import { styled } from "styled-components";
import { MenuButton } from "../../molecules";


const AppSidenav = styled.div`
position: absolute;
width: 366px;
height: 90vh;
left: 16px;
top: 38px;

@media screen and (max-width: 800px){
  width: 90vw;
  height: 10vh;
 
}
`

// const Menu = () => {
//     return <AppSidenav><Card></Card></AppSidenav>
// };


const Menu = ({ handler, data }) => {
  return (
    <>
    <AppSidenav><Card></Card></AppSidenav>
    
   
    <div>
      {data.map((x, i) => {
        let { icon, text, data } = x;
        return (
          <MenuButton key={i} handler={handler} icon={icon} data={data}>
            {text}
          </MenuButton>
        );
      })}
    </div>
    </>
  );
};

export default Menu;