import { gql  } from '@apollo/client'

export const BOOK_DETAILS = gql`
fragment BookDetails on Book{
    title
    author {
      name
      born
    }
    published
    genres
    id
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query getAllBooks($genre: String) {
  allBooks (genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String, $published: Int, $genres: [String!]!) {
  addBook (
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const SET_AUTHOR_BIRTHYEAR = gql`
mutation setAuthorBirtYear($name: String!, $setBornTo: Int! ) {
    editAuthor (
      name: $name
      setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation loginUser($username: String!, $password: String!) {
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`

export const CURRENT_USER = gql`
query {
  currentUser {
    username
    favoriteGenre
  }
}
`

export const ADD_BOOK_SUBSCRIPTION = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`