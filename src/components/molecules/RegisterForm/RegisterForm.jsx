import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
flex-flow: column wrap;
align-items: center;
justify-content: center;
font-size:18pt;

@media screen and (max-width: 800px){
    flex-flow: column wrap;
    margin: 0 10px 0 3px;

  }

`

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationMsg, setValidationMsg] = useState([]);
  const [infoMsg, setInfoMsg] = useState("");


  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const user = { username, password, passwordConfirm, name, email };
      if (password != passwordConfirm) {
        setErrorMsg("Please, ensure to write the same password twice");
        throw new Error();
      }
      // send the username and password to the server
      setInfoMsg("Loading...");
      const response = await axios.post(
        "http://localhost:8000/api/register",
        user
      );
      navigate("/login", { replace: true });
    } catch (error) {
      setInfoMsg("");

      if (error.response != null) {
        setErrorMsg(error.response.data.message);

        if (error.response.data.violations != null) {
          setValidationMsg(error.response.data.violations);
        
        }
      }
    }
  };

  return <Card>
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <StyledInput
        type="text"
        value={name}
        placeholder="Enter a name (updatable)"
        onChange={({ target }) => setName(target.value)}
      />
      <p>This name is what other users will see, you can change it whenever you want</p>
      <label htmlFor="email">Email: </label>
      <StyledInput
        type="text"
        value={email}
        placeholder="Enter an email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <label htmlFor="username">Username: </label>
      <StyledInput
        type="text"
        value={username}
        placeholder="Enter a username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <p>You will use it for authentification</p>


      <label htmlFor="password">Password: </label>
      <StyledInput
        type="password"
        value={password}
        placeholder="Enter a password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <label htmlFor="passwordConfirm">Confirm password: </label>
      <StyledInput
        type="password"
        value={passwordConfirm}
        placeholder="Confirm password"
        onChange={({ target }) => setPasswordConfirm(target.value)}
      />

      <Button type="submit" text="Register" height="45px" width="125px" fontSize="18pt"></Button>
      <div>
        {infoMsg}
      </div>
      <div>
        {errorMsg}
      </div>
      <div>
        {validationMsg.map((x, i) => {
          let { propertyPath, title } = x;
          return <p style={{ 'color': 'red' }} key={i}>{propertyPath} : {title}</p>
        })}
      </div>
      <p>Allready registered ? <Link style={{ ':visited': { 'color': 'red' } }} to="/login">Log in now</Link></p>

    </StyledForm>

  </Card>;

}

export default RegisterForm;
