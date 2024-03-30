import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers';
import { Button, Card } from '../../atoms';
import { styled } from "styled-components";
import { Link } from 'react-router-dom';

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

const LoginForm = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");


  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const user = { username, password };

      setInfoMsg("Loading...");
      const response = await axios.post(
        "http://localhost:8000/api/login_check",
        user
      );

      console.log(response.data);
      setToken(response.data.token, response.data.refresh_token);
      navigate("/", { replace: true });
    } catch (error) {
      setInfoMsg("");

      console.log(error.response.data);
      setErrorMsg(error.response.data.message);

    }

  };

  return (
    <Card>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <StyledInput
          type="text"
          value={username}
          placeholder="Enter a username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">Password: </label>
          <StyledInput
            type="password"
            value={password}
            placeholder="Enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" text="Login" height="45px" width="125px" fontSize="18pt"></Button>
        <div>
          {infoMsg}
        </div>
        <div>
          {errorMsg}
        </div>
        <p>Not registered yet ? <Link to="/register">Register now</Link></p>

      </StyledForm>

    </Card>
  )
}

export default LoginForm;
