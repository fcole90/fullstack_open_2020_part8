import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { SET_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries'


const SetAuhtorBirthYear = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [ setAuthorBirtYear ] = useMutation(SET_AUTHOR_BIRTHYEAR,{
    refetchQueries: [ { query: ALL_AUTHORS } ],
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

  if (result.loading) {
    return null
  }

  const handleUpdateYear = async (event) => {
    event.preventDefault()

    setAuthorBirtYear({  variables: {
      name,
      setBornTo: Number(year)
    }})
    
    console.log('edit author...')

    setName('')
    setYear('')
  }

  if (name === '') {
    setName(result.data.allAuthors[0].name)
  }
  

  return (
  <div>
    <h2>Set Author's birthyear</h2>
    <div>
      <label>name</label>
      <select value={name} onChange={(event) => setName(event.target.value)}>
        {result.data.allAuthors.map(a =>
          <option key={a.name} value={a.name}>{a.name}</option>
        )}
      </select>
    </div>
    <div>
      <label>year</label>
      <input type='number' value={year} onChange={(event) => setYear(event.target.value)} />
    </div>
    <button onClick={handleUpdateYear}>Update Author</button>
  </div>
  )
}

export default SetAuhtorBirthYear