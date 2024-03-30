import React from 'react'
import { Card } from '../../components/atoms';
import { Bookshelfs, Listbook } from '../../components/organisms';


const BookshelfPage = () => {
  return (
    <Card title={"Bookshelfs"}>
      <Bookshelfs></Bookshelfs>
      {/* <Listbook></Listbook> */}
    </Card>
  )
}

export default BookshelfPage;
