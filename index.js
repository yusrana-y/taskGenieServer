require('dotenv').config()

const router = require('./routes/router')
const express = require('express')
const cors = require('cors')
require('./dbConnections/connection')

const tgServer = express()

tgServer.use(cors())
tgServer.use(express.json())
tgServer.use(router)

PORT = 3000 || process.env.PORT

tgServer.listen(PORT,()=>{
    console.log(`tgServer running succesfully at ${PORT}`);
    
})

