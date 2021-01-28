import React from 'react'
import { useQuery } from '@apollo/client'

import Books from './Books'
import { CURRENT_USER } from '../queries'

const Recommendations = () => {
  const result = useQuery(CURRENT_USER)

  if (!result.data) {
    return null
  }

  console.log('data:', result.data)

  return <Books asRecommendations={result.data.currentUser.favoriteGenre} />
}

export default Recommendations