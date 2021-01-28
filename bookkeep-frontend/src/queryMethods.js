import { ALL_BOOKS } from './queries'


export const updateBooksCacheWith = (client, addedBook) => {
  const includedIn = (set, object) => 
    set.map(p => p.id).includes(object.id)
  

  const dataInStore = client.readQuery({ query: ALL_BOOKS })

  const includedObject = dataInStore.allBooks.find(book => (book.id === addedBook.id))
  console.log('Object equal to:', includedObject, addedBook)

  if (!includedIn(dataInStore.allBooks, addedBook)) {
    console.log('not inclued, adding...');
    client.writeQuery({
      query: ALL_BOOKS,
      data: { allBooks: dataInStore.allBooks.concat(addedBook) }
    })
  } else {
    console.log('included, not adding...');
  }
}