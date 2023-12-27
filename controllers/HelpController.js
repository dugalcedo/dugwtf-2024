const { ABS } = require ("../lib/env.js")

module.exports = function (req, res) {
    res.sendFile(ABS('/views/help/help.html'))
}