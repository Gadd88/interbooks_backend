const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: [
      'Fantasía', 'Ciencia Ficción', 'Novela', 'Romance', 'Terror', 'Suspenso', 'Biografía'
    ],
  },
  image: {
    type: String,
    required: true,
  },
  languague: {
    type: String,
    required: true,
    default: 'Español'
  },
  actions: [{
    type: String,
    enum: [
      'Venta', 'Intercambio', 'Regalo'
    ],
    required: true,
  }],
  ISBN: {
    type: String,
    unique: true,
    sparse: true,
  },
  synopsis: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }
});

const BookModel = mongoose.model("books", bookSchema, "books");

module.exports = BookModel;
