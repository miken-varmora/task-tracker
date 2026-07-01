// this is our entry point file

import app from './app.js'
import dotenv from 'dotenv'
import connetDb from './config/db.js'

dotenv.config() // for env file access

connetDb() // for database connection

const PORT = process.env.PORT || 3000  // this is port number


// Our server start from this code
app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`)
})