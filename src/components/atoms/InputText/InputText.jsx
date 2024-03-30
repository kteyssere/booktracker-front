import React from "react";
import { styled } from "styled-components";

const StyledInput = styled.input`

background-color: ${(props) => props.theme.secondary ?? "white"};
color: ${(props) => props.theme.primary ?? "black"};
width: ${(props) => props.width ?? "100%"};
height: ${(props) => props.height ?? ""};
border-radius: ${(props) => props.borderRadius ?? "50px"};


box-shadow: 10px 5px 5px #9c7e76;
padding: ${(props) => props.padding ?? "5px 0 10px 0"};
margin: ${(props) => props.margin ?? "5px 15px 0 auto"};


`;


const InputText = ({ type, value, placeholder, onChange, ...props }) => {
  return <StyledInput {...props} type={{type}} value={{value}} placeholder={{placeholder}} onChange={{onChange}} />;
};

export default InputText;