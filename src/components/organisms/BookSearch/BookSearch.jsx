import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Card } from "../../atoms";
import { Link } from "react-router-dom";
import { SearchBar } from "../../molecules";
import { getBookSearch } from "../../../store";

const BookSearch = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  const dispatch = useDispatch();
  const apiReturn = useSelector((state) => {
    return state.booksearch;
  });

  useEffect(() => {
    if (apiReturn.status === "succeed" && apiReturn.booksearch) {
      setInfoMsg("");
      setIsLoaded(true);
    } else if (apiReturn.status == "error") {

      return;
    }
  }, [apiReturn]);

  const handleSearchElement = (term) => {
    setInfoMsg("Loading...");
    dispatch(getBookSearch(term));
  };

  const renderDatas = () => {
    if (isLoaded) {
      return <div>
        {apiReturn.booksearch.map((x, i) => {
          let { title, id, imageLinks } = x;
          if (imageLinks == undefined) {
            imageLinks = [];
          }
          return <Card
            key={i}
            subtitle={title}
          ><Link to={{
            pathname: '/book-details/' + id,

          }}> <img src={imageLinks[0] ?? ""}></img> </Link>
          </Card>
        })}

      </div>;

    }
    return <div></div>;
  };
  return <div><SearchBar onSearch={handleSearchElement}></SearchBar>{infoMsg}
    {renderDatas()}</div>;
};

export default BookSearch;