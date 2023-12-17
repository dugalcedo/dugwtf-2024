// dotenv
import dotenv from 'dotenv'
dotenv.config()
const DEV = process.env.DEV ? true : false
const MONGO = process.env.MONGO
const PORT = process.env.PORT || 4321
const ROOT = process.env.ROOT || ""
const DOMAIN = DEV ? "http://localhost:4321/" : "https://dug.wtf/"
const ABS = path => ROOT + path

// cors
import cors from 'cors'

// express
import EXPRESS from 'express'
const APP = EXPRESS()
APP.use(EXPRESS.json())
APP.use(cors())


export {
    DEV,
    MONGO,
    PORT,
    EXPRESS,
    ROOT,
    ABS,
    APP,
    DOMAIN
}