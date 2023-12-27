// const { MONGO, DOMAIN } = require('../lib/env.js')
const { DOMAIN } = require('../lib/env.js')
const { msg } = require('../lib/util.js')
// const mongoose = require('mongoose')

// mongoose.connect(MONGO)
//     .then(conn => {
//         global.conn = conn
//         msg.success(`Connected to mongodb.`)
//     })
//     .catch(err => {
//         msg.error.full(`Error connecting to mongodb.`, err)
//     })

const dugs = require('./dugs.js')
global.dugs = dugs
global.dugsMini = dugs.map(minifyDug)

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