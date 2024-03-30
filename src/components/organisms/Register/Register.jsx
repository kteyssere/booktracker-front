import React from 'react'
import { styled } from "styled-components";
import { RegisterForm } from '../../molecules';

const RegisterContainer = styled.div`
flex:2;
height: 95vh;
@media screen and (max-width: 800px){
  height: 15vh;

}
`

const Register = () => {
  return (
    <RegisterContainer>
      <RegisterForm></RegisterForm>
    </RegisterContainer>
  )
}

export default Register;
