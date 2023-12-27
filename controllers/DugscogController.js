const { Router } = require("express")
const DugscogController = Router()

DugscogController.get('/', (req, res) => {
    res.json(req.query.full ? dugs : dugsMini)
})

module.exports = DugscogController