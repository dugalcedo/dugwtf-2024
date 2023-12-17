import { MONGO, DOMAIN } from '../lib/env.js'
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
global.dugsMini = dugs.map(minifyDug)
console.log(dugsMini)

global.findDug = function(filter) {
    const entries = Object.entries(filter)
    return dugs.filter(dug => {
        return entries.every(([k,v]) => {
            return dug[k] == v
        })
    })
}

function minifyDug(_dug) {
    const dug = {}
    dug.released = _dug.released.display
    if (_dug.artist !== 'Dug Alcedo') dug.artist = _dug.artist
    dug.title = _dug.title
    dug.cover = _dug.cover.xs
    dug.type = _dug.type

    dug.bc_link = `/api/bc/${_dug.idno}`
    return dug
}