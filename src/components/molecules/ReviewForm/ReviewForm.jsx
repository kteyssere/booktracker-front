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

const ReviewForm = ({ onAdd, idBook, ...props }) => {

  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
 
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      console.log(idBook)

      const review = { comment, title, idBook };

      setInfoMsg("Loading...");
      console.log(review);
      const response = await axios.post(
        "http://localhost:8000/api/review",
        review
      );

      if (response.status == 201) {
        setInfoMsg("Comment created !");
        onAdd();

        setTimeout(() => {
          setErrorMsg("");
          setInfoMsg("");
          setComment("");
          setTitle("");
        }, 5000);
      }
    } catch (error) {
      setInfoMsg("");
      setErrorMsg(error.response.data.message);
    }
  };


  return (
    <Card subtitle={"New comment"}>
      <StyledForm {...props} onSubmit={handleSubmit}>
        <div>
          <StyledInput
            type="text"
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <StyledInput
            type="text"
            value={comment}
            placeholder="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <Button type="submit" text="Add" height="45px" width="125px" fontSize="18pt"></Button>
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

export default ReviewForm;
