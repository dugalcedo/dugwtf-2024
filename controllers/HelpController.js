import { ABS } from "../lib/env.js"

export default function HelpController(req, res) {
    res.sendFile(ABS('/views/help/help.html'))
}