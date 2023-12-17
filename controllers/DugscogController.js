import { Router } from "express"
const DugscogController = Router()

DugscogController.get('/', (req, res) => {
    res.json(dugs)
})

export default DugscogController