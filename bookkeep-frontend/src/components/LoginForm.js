import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const LoginForm = ({setToken, setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ loginUser, loginResult ] = useMutation(LOGIN,{
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

  useEffect(() => {
    if ( loginResult.data ) {
      const token = loginResult.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      setPage('home')
    }
  }, [loginResult.data, setToken, setPage])


  const submit = async (event) => {
    event.preventDefault()

    loginUser({  variables: {
      username,
      password
    }})
    
    console.log('logging in...')

    setPassword('')
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default LoginForm