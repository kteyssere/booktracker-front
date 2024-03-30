import React from 'react'
import { styled } from "styled-components";

const StyledBookCover = styled.img`
width: ${(props) => props.width ?? "100%"};
height: ${(props) => props.height ?? ""};
`

const BookCover = ({...props}) => {
  return <StyledBookCover {...props}></StyledBookCover>
}

export default BookCover
