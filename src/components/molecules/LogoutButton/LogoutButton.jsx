import React from 'react'
import { Button } from '../../atoms'
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';

const LogoutButton = ({ data, colorButton, ...props }) => {
  return (
    <Link to={data}> <Button
      color={colorButton}
      text={props.children}
      icon={<CiLogout />}
      height={"35px"}
      width={"35px"}
    ></Button></Link>
  )
}

export default LogoutButton;
