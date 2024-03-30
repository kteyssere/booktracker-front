import React from 'react'
import { styled } from "styled-components";

const StyledContainer = styled.div`

`

const StyledProgressBar = styled.div`
width: 100%;
background-color: ${(props) => props.theme.primary ?? "white"};
border-radius: 5px;
margin-bottom: 10px;
`

const StyledProgress = styled.div`
height: 20px;
  background-color: ${(props) => props.theme.secondary ?? "black"};
  border-radius: 5px;
  text-align: center;
  color: white;
`

const ProgressBar = ({progress, width, ...props}) => {
  return <StyledContainer style={{ width: `${width}%` ?? '100%' }}>
    <StyledProgressBar>
    <StyledProgress style={{ width: `${progress}%` ?? '0%' }}></StyledProgress>
  </StyledProgressBar>
  </StyledContainer>
}

export default ProgressBar
