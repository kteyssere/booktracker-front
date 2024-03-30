import React from 'react'
import { BookDetails } from '../../components/organisms';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/atoms';


const BookDetailsPage = () => {
    const { id } = useParams();
  return (
    <Card>
      <BookDetails idBook={id}></BookDetails>
    </Card>
  )
}

export default BookDetailsPage;