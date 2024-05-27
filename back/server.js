const express = require("express")
const V1SwaggerDocs = require("./docs/swagger.js")
const cors = require("cors")
const authRoutes = require("./routes/auth.routes.js")
const homeRoutes = require("./routes/home.routes.js")
const bookRoutes = require("./routes/book.routes.js")
const passport = require('passport');
require('./middlewares/auth.middlewares');
require("dotenv").config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.json())
app.use(passport.initialize());
app.disable("x-powered-by")

const connectDB = require("./db/connect")
const userRoutes = require("./routes/userRoutes")

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 3000

const connectDataBase = async () => {
    try {
        await connectDB(DB_URL)
        console.log("Connection to the database succesful")
        app.listen(PORT, console.log(`🚀 Server running on ${PORT}\n`),
            V1SwaggerDocs.swaggerDocs(app, PORT)
        )
    } catch (e) {
        console.log("Error connecting to the database", e)
    }
}

connectDataBase()

// Routes
app.use("/api", userRoutes)
app.use("/api", authRoutes)
app.use("/api", homeRoutes)
app.use("/api", bookRoutes)