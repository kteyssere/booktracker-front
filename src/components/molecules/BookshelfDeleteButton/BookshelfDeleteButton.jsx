import React, { useState } from 'react'
import { Button } from '../../atoms'
import { CiTrash } from "react-icons/ci";
import axios from 'axios';

const BookshelfDeleteButton = ({ onDelete, idBS, data, colorButton, ...props }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const deleteBookshelf = async e => {

    try {
      console.log(idBS);
      e.preventDefault();

      setInfoMsg("Loading...");
      const response = await axios.delete(
        "http://localhost:8000/api/list-book/" + idBS,
        { data: { force: "false" } }

      );

      if (response.status == 204) {
        setInfoMsg("Bookshelf deleted !");
        onDelete();

        setTimeout(() => {
          setErrorMsg("");
          setInfoMsg("");
        }, 5000);
      }
    } catch (error) {
      setInfoMsg("");
      setErrorMsg(error.response.data.message);
      console.log(error);
    }

  };

  return (<div>
    <Button
      onClick={deleteBookshelf}
      color={colorButton}
      text={props.children}
      icon={<CiTrash />}
      height={"35px"}
      width={"35px"}
    ></Button>
    {infoMsg} {errorMsg}</div>
  )
}


export default BookshelfDeleteButton;
