import React, { useEffect, useState } from "react";
import { BookCover, Card, ProgressBar } from "../../atoms";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getLatestProgression } from "../../../store/index";

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
    console.log(state.latestProgression);
    return state.latestProgression;
  });

  useEffect(() => {
    dispatch(getLatestProgression());
  }, []);

  useEffect(() => {
    console.log(apiReturn);
    if (apiReturn.status === "succeed" && apiReturn.latestProgression) {
      setIsLoaded(true);
    } else if (apiReturn.status == "error") {
      return;
    }
  }, [apiReturn]);

  const renderBookOverview = () => {
    if (isLoaded) {
      console.log(apiReturn);
      return <Card subtitle={"Now reading :"}>
        {apiReturn.latestProgression.map((x, i) => {

          let { title } = x;
          return <p key={i}>{title}</p>
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