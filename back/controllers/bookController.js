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


module.exports = {
    addBook,
    deleteBook
}