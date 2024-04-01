import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getBook } from "../../../store/index";
import { Card } from "../../atoms";
import { ProgressionForm, ReviewForm } from '../../molecules';


const BookDetails = ({ idBook, ...props }) => {
 
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const apiReturn = useSelector((state) => {
    return state.book;
  });

  useEffect(() => {
    dispatch(getBook(idBook));
  }, []);

  useEffect(() => {
    if (apiReturn.status === "succeed" && apiReturn.book) {
      setIsLoaded(true);
    } else if (apiReturn.status == "error") {
      return;
    }
  }, [apiReturn]);

  const handleAddElement = () => {
    dispatch(getBook(idBook));
  };

  const renderDatas = () => {
    if (isLoaded) {
      
      let { title, imageLinks, description, authors, categories, publisher, totalPages, reviews, progressions } = apiReturn.book;
      return <div>
        <Card title={title}>
          <img src={imageLinks[0]}></img>
          <div>
            <p>Progression :</p>
            <ProgressionForm onAdd={handleAddElement} idBook={idBook}></ProgressionForm>
            {/* {progressions.map((x, i) => {

              // let { title, comment, user, createdAt } = x;
              // const dateObject = new Date(createdAt).toLocaleDateString();

              // return <Card key={i} title={title} subtitle={dateObject}>
              //   <p>{user.username}</p>
              //   <p>{comment}</p>
               
              // </Card>
            })} */}
          </div>
          <div>
            <p>Authors :</p>
            {authors.map((x, i) => {

              let { name } = x;

              return <p
                key={i}

              >{name}</p>
            })}
          </div>
          <div>
            <p>Categories :</p>
            {categories.map((x, i) => {

              let { name } = x;

              return <p
                key={i}

              >{name}</p>
            })}
          </div>
          <div>
            <p>Publisher :</p>
            <p>{publisher}</p>
          </div>
          <div>
            <p>Total pages :</p>
            <p>{totalPages}</p>
          </div>
          <div>
            <p>Description :</p>
            <p>{description}</p>
          </div>
          <div>
            <p>Reviews :</p>
            <ReviewForm onAdd={handleAddElement} idBook={idBook}></ReviewForm>
            {reviews.map((x, i) => {

              let { title, comment, user, createdAt } = x;
              const dateObject = new Date(createdAt).toLocaleDateString();

              return <Card key={i} title={title} subtitle={dateObject}>
                <p>{user.username}</p>
                <p>{comment}</p>
               
              </Card>
            })}
          </div>
        </Card>
      </div>;
    }
    return <div>Data has not loaded yet</div>;
  };
  return <div>{renderDatas()}</div>;
}

export default BookDetails;
