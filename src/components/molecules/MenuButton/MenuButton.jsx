import React, { useState } from "react";
import { Button } from "../../atoms";
import { Link } from 'react-router-dom';

const MenuButton = ({ handler, data, icon = <></>, content, ...props }) => {
  const [colorButton, setColorButton] = useState("");
  const handlePageChange = () => {
    handler(data);
  };

  return (<Link to={data}> <Button

    color={colorButton}
    text={props.children}
    icon={icon}
    fontSize={"15pt"}
    height={"35px"}
    width={"240px"}
  ></Button></Link>
  );
};

export default MenuButton;