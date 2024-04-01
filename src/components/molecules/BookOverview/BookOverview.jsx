import React, { useEffect, useState } from "react";
import { BookCover, Card, ProgressBar } from "../../atoms";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getLatestProgression } from "../../../store/index";
import { Link } from "react-router-dom";

const Container = styled.div`
display: flex;
gap: 30px;
flex-flow: row wrap;
width: 240px;


`

const BookOverview = ({ bookCover, progress, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const apiReturn = useSelector((state) => {
    return state.latestProgression;
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(getLatestProgression());
    }, 5000);
  }, []);

  useEffect(() => {
    if (apiReturn.status === "succeed" && apiReturn.latestProgression) {
      setIsLoaded(true);
    } else if (apiReturn.status == "error") {
      return;
    }
  }, [apiReturn]);

  const renderBookOverview = () => {
    if (isLoaded) {
      return <Card subtitle={"Now reading :"}>
        {apiReturn.latestProgression.map((x, i) => {

          let { progress, Book } = x;

          if (Book.imageLinks.length > 0) {

            return <>
              <Link to={{
                pathname: '/book-details/' + Book.id,

              }}> <img key={i} src={Book.imageLinks[0]}></img> </Link>
              <ProgressBar progress={progress}></ProgressBar>
            </>
          } else {
            return <>
              <Link to={{
                pathname: '/book-details/' + Book.id,
              }}><p>{Book.title}</p></Link>
              <ProgressBar progress={progress}></ProgressBar>
            </>
          }

        })}

      </Card>;
    }
    return <Card subtitle={"Now reading :"}>
      <p>No progression book found yet</p>
    </Card>
      ;
  };

  return <Container>{renderBookOverview()}</Container>;
};

export default BookOverview;