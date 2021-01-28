import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import SetAuthorBirthYear from './components/SetAuthorBirthYear'
import Books from './components/Books'
import Recommendations from './components/Recommendations'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { ADD_BOOK_SUBSCRIPTION } from './queries'
import { updateBooksCacheWith } from './queryMethods'

const App = () => {
  const [page, setPage] = useState('home')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(ADD_BOOK_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      // window.alert(`Added book: ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}`)
      console.log('Sub:', subscriptionData.data.bookAdded)
      updateBooksCacheWith(client, subscriptionData.data.bookAdded)
    }
  })

  if (!token) {
    const savedToken = localStorage.getItem('user-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }
  
  const logOut = () => {
    if (!window.confirm('Are you sure you want to log out?')) {
      return
    }
    
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { 
          token 
          ? (<>
              <button onClick={() => setPage('add')}>add book</button> 
              <button onClick={() => setPage('recommendations')}>recommendations</button> 
              <button onClick={logOut}>logout</button> 
            </>)
          : <button onClick={() => setPage('login')}>login</button>  
        }
      </div>

      {
        (page === 'authors' || page === 'home' )
        && <>
            <Authors />
            {token && <SetAuthorBirthYear />}
          </>
      }

      {
        page === 'books' 
        && <Books />
      }

      {
        page === 'add' 
        && <NewBook setPage={setPage} />
      }

      {
        page === 'recommendations' 
        && <Recommendations />
      }

      {
        page === 'login'
        && <LoginForm
        setToken={setToken}
        setPage={setPage}
        />
      }

    </div>
  )
}

export default App