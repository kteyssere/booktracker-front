import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getListBook } from "../../../store/listbookSlice/listbookSlice";
import { Card } from "../../atoms";
import { Link } from "react-router-dom";
import { BookshelfDeleteButton, BookshelfForm } from "../../molecules";


const Bookshelfs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const dispatch = useDispatch();
  const apiReturn = useSelector((state) => {
    return state.listbook;
  });

  useEffect(() => {
    dispatch(getListBook());
  }, []);
  useEffect(() => {
    if (apiReturn.status === "succeed" && apiReturn.listbook) {
      setIsLoaded(true);
    } else if (apiReturn.status == "error") {
      return;
    }
  }, [apiReturn]);

  const handleAddElement = () => {
    dispatch(getListBook());
  };

  const renderDatas = () => {
    if (isLoaded) {
      return <div>
        {apiReturn.listbook.map((x, i) => {
        
          let { name, book } = x;

          return <Card
            key={i}
            subtitle={name}
          >
            <BookshelfDeleteButton onDelete={handleAddElement} idBS={x.id}></BookshelfDeleteButton>
            {book.map((y, j) => {
              let { id, title, imageLinks } = y;

              if (imageLinks.length > 0) {

                return <Link to={{
                  pathname: '/book-details/' + id,

                }}> <img key={j} src={imageLinks[0]}></img> </Link>
              } else {
                return <Link to={{
                  pathname: '/book-details/' + id,
                }}><p>{title}</p></Link>
              }
            
            })}
          </Card>
        })}

      </div>;

    }
    return <div>Data has not loaded yet</div>;
  };
  return <div><BookshelfForm onAdd={handleAddElement}></BookshelfForm>
    {renderDatas()}</div>;
};

export default Bookshelfs;