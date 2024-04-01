import React, { useState } from 'react'
import axios from 'axios';
import { Button, Card } from '../../atoms';
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

const ProgressionForm = ({ onAdd, idBook, ...props }) => {

  const [progress, setProgress] = useState();
 
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
 
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const progrFloat = parseFloat(progress);
      const progression = { progrFloat, idBook };

      setInfoMsg("Loading...");
     
      const response = await axios.post(
        "http://localhost:8000/api/progression",
        progression
      );

      if (response.status == 201) {
        setInfoMsg("Book progression created !");
        onAdd();

        setTimeout(() => {
          setErrorMsg("");
          setInfoMsg("");
          setProgress("");
        }, 5000);
      }
    } catch (error) {
      setInfoMsg("");
     
      setErrorMsg(error.response.data.message);
    }
  };


  return (
    <Card subtitle={"Create progression book"}>
      <StyledForm {...props} onSubmit={handleSubmit}>
        <div>
          <StyledInput
            type="float"
            value={progress}
            placeholder="Number of latest reading page"
            onChange={({ target }) => setProgress(target.value)}
          />
        </div>
        <Button type="submit" text="Create" height="45px" width="125px" fontSize="18pt"></Button>
        <div>
          {infoMsg}
        </div>
        <div>
          {errorMsg}
        </div>
      </StyledForm>
    </Card>
  )
}

export default ProgressionForm;
