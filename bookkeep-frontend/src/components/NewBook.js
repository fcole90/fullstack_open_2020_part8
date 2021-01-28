import React, { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'

import { CREATE_BOOK, ALL_AUTHORS } from '../queries'
import { updateBooksCacheWith } from '../queryMethods'

const NewBook = ({setPage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()

  const [ createBook ] = useMutation(CREATE_BOOK,{
    refetchQueries: [ { query: ALL_AUTHORS } ],
    update: (store, response) => {
      updateBooksCacheWith(client, response.data.addBook)
    },
    onError: ({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Line ${locations[0].line}:${locations[0].column}: ${message}, path: ${path}`
        ),
        )
      }

      if (networkError?.result?.errors) {
        networkError.result.errors.map(({ message, locations, extensions }) =>
          console.log(
            `[Network error]: Line ${locations[0].line}:${locations[0].column}: ${message} Extension:`,  extensions
          ),
        )
      }
    }
  }) 


  const submit = async (event) => {
    event.preventDefault()

    createBook({  variables: {
      title,
      author,
      published: Number(published),
      genres
    }})
    
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')

    setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook