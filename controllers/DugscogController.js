import { Router } from "express"
const DugscogController = Router()

DugscogController.get('/', (req, res) => {
    res.json(req.query.full ? dugs : dugsMini)
})

export default DugscogController