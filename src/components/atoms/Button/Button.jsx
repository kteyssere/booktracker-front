import React from 'react'
import { styled } from 'styled-components'

const StyledButton = styled.button`
 ${(props) => props.height ? 'height: '+ props.height + " ;" : ""}
 ${(props) => props.width ? 'width: '+ props.width + " ;" : ""}
 background : ${(props) => 
    (props.background ? props.background : props.theme.secondary)};
color : ${(props) => (props.color ? props.color : props.theme.primary)};
border-radius: 50px;
font-size: ${(props) => (props.fontSize ? props.fontSize : "")};
font-family: inherit;
border: none;
transition-duration: 0.4s;

&:hover { 
    background-color: ${(props) => (props.color ? props.color : props.theme.primary)};
    color: ${(props) => 
        (props.background ? props.background : props.theme.secondary)};
}
`

const Button = ({icon = (<></>), text= "", ...props}) => {
    return (
        <StyledButton {...props}>
            {icon} {text}</StyledButton>
    )
}

export default Button;