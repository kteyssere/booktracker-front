import React from 'react'
import { Card } from '../../components/atoms';
import BookSearch from '../../components/organisms/BookSearch/BookSearch';

const Home = () => {
  return (
    <Card title={"Home"}>
      <Card subtitle={"Search for a book :"}>
      <BookSearch></BookSearch>
      </Card>
    </Card>
  )
}

export default Home;
