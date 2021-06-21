import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
  query GetCategories {
    categories {
      name,
      id
    }
  }
`

export default function SiteHeader() {
  const { loading, error, data } = useQuery(CATEGORIES)

  if (loading) return <p>Loading categories...</p>
  if (error) return <p>Error fetching categories</p>

  return (
    <div className="site-header">
      <Link to="/"><h1>Ninja Reviews</h1></Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {data.categories.map(category => (
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
