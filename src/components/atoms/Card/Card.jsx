import React from "react";
import style from "./Card.module.css";

import { CiBeerMugFull } from "react-icons/ci";
import { styled } from "styled-components";
import Button from "../Button/Button";
const CardContainer = styled.div`
background-color: ${(props) => props.theme.secondary ?? "white"};
color: ${(props) => props.theme.primary ?? "black"}
width: ${(props) => props.width ?? "100%"};
height: ${(props) => props.height ?? "100%"};
border-radius: ${(props) => props.borderRadius ?? "50px"};

box-shadow: 10px 5px 5px #9c7e76;
`;

const CardHeader = styled.div`
margin-top: 10%;
`;

const CardTitle = styled.div`
height:40vh;
background-color:black;
`;

const CardContent = styled.div`

`;


const Card = (props) => {
    return <CardContainer {...props}>
            <CardHeader>
                <CardTitle>
                    {'ghfjdksl'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {'vghjcdksl'}
            </CardContent>
        </CardContainer>;
}


export default Card;