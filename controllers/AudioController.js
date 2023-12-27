const { Router } = require("express")
const { missingFields, serverError } = require("../lib/util.js")
const { readdirSync, statSync, createReadStream } = require("fs")
const { DEV } = require('../lib/env.js')
const dugs = require("../db/dugs.js")

const AudioController = Router()

const trackName = fileName => {
    fileName = fileName.replace(/\d+\s/g, "")
    return fileName.replace('.mp3','')
}

const dugsPicks = [
    ["040", 2], // prune
    ["042c", 4], // sleeping soundly
    ["027", 2], // aw cute
    ["041", 8], // comber
    ["042", 8], // extensive tapes
    ["039", 12], // aaek ooruzz
    ["038", 10], // acre crumb
    ["037", 1], // starship comino
    ["036", 5], // wd nin wehi
    ["035", 3], // light in darkness
    ["034", 8], // QRYP
    ["033", 12], // arcoss celestail pnod
    ["032", 1], // carnation
    ["030", 11], // santa sangre
    ["029", 1], // dead dog
    ["028", 1], // battle
    ["027b", 6], // aw cute demo
    ["025", 5], // laundry day
    ["022", 15], // tapyoka
    ["021", 12], // so tired
]

AudioController.get('/track', (req, res) => {
    if (missingFields(req.query, ['albumId', 'trackNo'])) {
        res.status(400).send("Your request must have the parameters 'albumId' and 'trackNo'.")
    }

    const trackNo = Number(req.query.trackNo) - 1

    try {
        var albumPath = `./db/audio/${req.query.albumId}`
        var fileNames = readdirSync(albumPath)
    } catch (error) {
        res.status(404).send("Audio not found.")
    }


    var fileName = fileNames[trackNo]
    if (!fileName) res.status(404).send("Audio not found.")

    console.log(DEV)
    // if (DEV) for (let i = 0; i < 10**9; i++) {}

    try {
        const path = albumPath + "/" + fileName
        const stat = statSync(path)
        res.header('Content-Type', 'audio/mp3')
        res.header('Content-Length', stat.size)
        const stream = createReadStream(path)
        stream.pipe(res)
    } catch (error) {
        serverError(req, res, error, "Error while trying to stream audio.")
    }
})

AudioController.get('/tracklist', (req, res) => {
    if (!req.query.albumId) {
        res.status(400).send("URL parameter 'albumId' is required.")
    }

    try {
        var albumPath = `./db/audio/${req.query.albumId}`
        var fileNames = readdirSync(albumPath)
        res.json(fileNames.map(trackName))
    } catch (error) {
        console.log(error)
        res.status(404).send("Album not found.")
    }
})

AudioController.get('/picks', (req, res) => {
    const picks = []
    dugsPicks.forEach(([_id, trackNo]) => {
        const album = dugs.find(d => d.id === `DUG${_id}`)
        const track = album.tracklist[trackNo-1]
        track.i = trackNo-1
        track.artist = album.artist
        track.album = album.title
        track.dugId = album.id
        picks.push(track)
    })
    res.json(picks)
})

module.exports = AudioController