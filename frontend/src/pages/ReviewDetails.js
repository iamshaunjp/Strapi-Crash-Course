import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      title,
      body,
      rating,
      id,
      categories {
        name,
        id
      }
    }
  }
`

export default function ReviewDetails() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div className="review-card">
      <div className="rating">{data.review.rating}</div>
      <h2>{data.review.title}</h2>

      {data.review.categories.map(c => (
        <small key={c.id}>{c.name}</small>
      ))}

      <p>{data.review.body}</p>
    </div>
  )
}
