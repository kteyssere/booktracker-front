import React from "react";
import { styled } from "styled-components";
import { MenuButton, NightModeSwitch, BookOverview } from "../../molecules";
import { Card } from "../../atoms";
import Offline from "../../../Offline";
import LogoutButton from "../../molecules/LogoutButton/LogoutButton";

const AppSidenav = styled.div`

flex:2;
height: 95vh;
@media screen and (max-width: 800px){
  height: 15vh;

 
}
`


const Menu = ({ title, content, data, handler, ...props }) => {
  return (
    <>
      <AppSidenav>
        <Card>

          {data.map((x, i) => {
            let { icon, text, slug } = x;
            return (
              <MenuButton key={i} handler={handler} icon={icon} data={slug}>
                {text}
              </MenuButton>
            );
          })}
          <BookOverview></BookOverview>

          <NightModeSwitch></NightModeSwitch>
          <Offline></Offline>

          <LogoutButton data={"/logout"}></LogoutButton>

        </Card>

      </AppSidenav>
    </>
  );
};

export default Menu;