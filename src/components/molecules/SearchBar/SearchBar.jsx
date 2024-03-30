import React, { useState } from 'react'
import { Button } from '../../atoms';
import { styled } from "styled-components";

const StyledInput = styled.input`

background-color: ${(props) => props.theme.secondary ?? "white"};
color: ${(props) => props.theme.primary ?? "black"};
width: ${(props) => props.width ?? "100%"};
height: ${(props) => props.height ?? ""};
border-radius: ${(props) => props.borderRadius ?? "50px"};
border: none;
text-align: center;
box-shadow: 10px 5px 5px #9c7e76;
padding: ${(props) => props.padding ?? "5px 0 10px 0"};
margin: ${(props) => props.margin ?? "5px 15px 0 auto"};
font-size:18pt;

`;

const StyledForm = styled.form`
text-align: center;
display: flex;
gap: 15px;
flex-flow: nowrap;
align-items: center;
justify-content: center;
font-size:18pt;
margin: 0 10px 0 3px;

@media screen and (max-width: 800px){
    flex-flow: column wrap;
    margin: 0 10px 0 3px;

  }

`

const SearchBar = ({ onSearch, ...props }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <StyledForm {...props} onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={searchTerm}
        placeholder="Search..."
        onChange={({ target }) => setSearchTerm(target.value)}
      />
      <Button type="submit" text="Search" height="45px" width="125px" fontSize="18pt"></Button>
    </StyledForm>
  )
}

export default SearchBar;
