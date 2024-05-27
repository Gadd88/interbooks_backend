const express = require('express')
const bookController = require('../controllers/bookController')
const upload = require('../middlewares/multer')
const passport = require('../middlewares/auth.middlewares');

const router = express.Router()

const genres = [
    'Fantasía', 'Ciencia Ficción', 'Novela', 'Romance', 'Terror', 'Suspenso', 'Biografía'
  ];
const actions = [
        'Venta', 'Intercambio', 'Regalo'
]

router.get('/books/genres-actions', (req, res) => {
    res.json({genres: genres, actions: actions})
})
router.post('/books', passport.authenticate('jwt', { session: false }), upload.single('image'), bookController.addBook)
router.delete('/books/:id', passport.authenticate('jwt', { session: false }), bookController.deleteBook)



module.exports = router