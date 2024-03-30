import React from 'react'
import { styled } from "styled-components";
import { LoginForm } from '../../molecules';

const LoginContainer = styled.div`
flex:2;
height: 95vh;
@media screen and (max-width: 800px){
  height: 15vh;

}
`

const Login = () => {
  return (
    <LoginContainer>
      <LoginForm></LoginForm>
    </LoginContainer>
  )
}

export default Login;
