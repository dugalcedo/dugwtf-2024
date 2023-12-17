import { MONGO } from '../lib/env.js'
import { msg } from '../lib/util.js'
import mongoose from 'mongoose'

mongoose.connect(MONGO)
    .then(conn => {
        global.conn = conn
        msg.success(`Connected to mongodb.`)
    })
    .catch(err => {
        msg.error.full(`Error connecting to mongodb.`, err)
    })

import dugs from './dugs.js'
global.dugs = dugs

global.findDug = function(filter) {
    const entries = Object.entries(filter)
    return dugs.filter(dug => {
        return entries.every(([k,v]) => {
            return dug[k] == v
        })
    })
}
