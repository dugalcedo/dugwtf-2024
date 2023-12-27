// dotenv
const dotenv = require('dotenv')
dotenv.config()
const DEV = process.env.DEV ? true : false
const MONGO = process.env.MONGO
const PORT = process.env.PORT || 4321
const ROOT = process.env.ROOT || ""
const DOMAIN = DEV ? "http://localhost:4321/" : "https://dug.wtf/"
const ABS = path => ROOT + path

// cors
const cors = require('cors')

// express
const EXPRESS = require('express')
const APP = EXPRESS()
APP.use(EXPRESS.json())
APP.use(cors())


module.exports = {
    DEV,
    MONGO,
    PORT,
    EXPRESS,
    ROOT,
    ABS,
    APP,
    DOMAIN
}