const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')

const { MONGODB_URI } = require('./config')
const Book = require('../models/book')
const Author = require('../models/author')

console.log('connecting to', MONGODB_URI)

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error connection to MongoDB:', error.message)
  }
}
connect()


const setUp = async () => {
  // const authorPromises = authors.map(async author =>
  //   new Author().save() 
  // )
  // await Promise.all(authorPromises)
  try {
      const authors = await Author.find({})
      // const updatePromises = authors.map(async author => {
      //   const books = await Book.find({author: author.id})
      //   console.log('By', author.name)
      //   console.log(books)
      //   booksIDs = books.map(book => book.id)
      //   author.authorOf = booksIDs
      //   await author.save()
      // })

      console.log(authors)
  } catch (error) {
    console.log(error)
  }
} 
setUp()
console.log('complete!')