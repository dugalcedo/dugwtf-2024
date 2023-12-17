import { Router } from "express"
import { missingFields, serverError } from "../lib/util.js"
import { readdirSync, statSync, createReadStream } from "fs"

const AudioController = Router()

const trackName = fileName => {
    fileName = fileName.replace(/\d+\s/g, "")
    return fileName.replace('.mp3','')
}

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
        res.status(404).send("Album not found.")
    }
})

export default AudioController