const express = require('express')
const connect =require ('./db_connect/db')
const cors = require('cors');
const app = express()

const port = 8080

connect()
app.use(cors())
app.use('/auth/',require("./Routes/Auth.js")),
app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
})

