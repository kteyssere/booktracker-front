import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider/AuthProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    setToken();
    navigate("/login", { replace: true });

  }); 

  return <>Redirecting to login page...</>;
};

export default Logout;
