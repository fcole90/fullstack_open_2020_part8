import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = ({asRecommendations}) => {
  const [getAllBooks, result] = useLazyQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(asRecommendations ? asRecommendations : '')
  const [genres, setGenres] = useState([])
  const books = result?.data?.allBooks ?? null

  useEffect(() => {
    if (!books) {
      return
    }

    setGenres(genres => books
      .map(book => book.genres)
      .reduce((genresAccumulator, currentGenresArray) => (
        [
          ...genresAccumulator,
          ...currentGenresArray.filter(
            thisGenre => !genresAccumulator.includes(thisGenre)
          )
        ]
      ), genres)
    )
  },[books])

  useEffect(() => {
    if (filter === '') {
      getAllBooks()    
    } else {
      getAllBooks({
        variables: {
          genre: filter
        }
      })
    }
  }, [filter, getAllBooks])



  if (!result.data) {
    return null
  }

  return (
    <div>
      {
        asRecommendations
        ? <>
            <h2>recommendations</h2>
            <p>your favourite genre: <em>{asRecommendations }</em></p>
          </>
        : <h2>books</h2>
      }
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {result?.data?.allBooks.map(a =>
          // {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(', ')}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        !asRecommendations &&
        <>
          <h2>Filter by genre:</h2>
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option key='none' value={''}>No selection</option>
            {genres.map(genre =>
              <option key={genre} value={genre}>{genre}</option>
            )}
          </select>
        </>
      }
    </div>
  )
}

export default Books