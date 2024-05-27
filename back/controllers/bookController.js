const BookModel = require('../models/BooksModel')
const booksServices = require('../services/booksServices')

const addBook = async (req, res ) => {
    try{
        const result = await booksServices.addNewBook(req)
        if(result.error) return res.status(400).json(result.message)
        res.status(200).json(result)
    }catch(error){
        console.error(error)
    }
}

const deleteBook = async (req, res) => {
    try{
        const result = await booksServices.deleteBook(req.params.id)
        if(result.error) return res.status(400).json(result)
        res.status(200).json(result)
    }catch(error){
        console.error(error)
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await BookModel.find()
        if(!books || books.length === 0) return res.status(404).json({message: "No books found"})
        res.status(200).json(books)
    }catch(e){
        console.error(e)
    }
}


module.exports = {
    addBook,
    deleteBook,
    getBooks
}