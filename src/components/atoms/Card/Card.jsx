import React from "react";
import { styled } from "styled-components";


const CardContainer = styled.div`
background-color: ${(props) => props.theme.secondary ?? "white"};
color: ${(props) => props.theme.primary ?? "black"};
width: ${(props) => props.width ?? "100%"};
height: ${(props) => props.height ?? ""};
border-radius: ${(props) => props.borderRadius ?? "50px"};


box-shadow: 10px 5px 5px #9c7e76;
padding: ${(props) => props.padding ?? "5px 0 10px 0"};
margin: ${(props) => props.margin ?? "5px 15px 0 auto"};
`;

const CardHeader = styled.div`

`;

const CardTitle = styled.div`
text-align: center;
`;

const CardContent = styled.div`
text-align: center;
display: flex;
gap: 30px;
flex-flow: row wrap;
align-items: center;
justify-content: center;

@media screen and (max-width: 800px){
    flex-flow: column wrap;
    margin: 0 10px 0 3px;

  }
`;


const Card = ({ title, subtitle, ...props }) => {
    return <CardContainer>
        <CardHeader>
            <CardTitle>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </CardTitle>
        </CardHeader>
        <CardContent>
            {props.children}
        </CardContent>
    </CardContainer>;
}


export default Card;