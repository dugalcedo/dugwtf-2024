module.exports.missingFields = function(obj, fields) {
    return !fields.every(field => {
        return obj[field]
    })
}

// msg
const chalk = require('chalk')
String.prototype.amt = function(n) {
    let str = ""
    for (let i = 0; i < n; i++) {
        str += this
    }
    return str
}
const msg = {
    color: 'blue',
    bg: 'Black',
    draw: function(str) {
        console.log(chalk[this.color][`bg${this.bg}`](str))
    },
    barrier: function(len, char, lCorner = char, rCorner = lCorner) {
        this.draw(lCorner+char.amt(len)+rCorner)
    },
    line: function(str, w, p, l, r = l) {
        let lPad = (" ").amt(Math.floor((w-str.length)/2))
        let rPad = (" ").amt(Math.ceil((w-str.length)/2))
        this.draw(l+lPad+str+rPad+r)
    }
}
msg.big = function(str, options = {}) {
    const P = options.p || 4
    this.color = options.color || 'white'
    this.bg = options.bg || 'Black'
    let lns = str.split('\n')
    const W = Math.max(...lns.map(ln=>ln.length))+P
    this.barrier(W, '═', '╔', '╗')
    str.split('\n').forEach(ln => {
        this.line(ln, W, P, "║")
    })
    this.barrier(W, '═', '╚', '╝')
}
msg.success = function(str) {
    console.log(chalk.white.bgGreen.bold(` ${str} `))
}
msg.error = function(str) {
    console.error(chalk.white.bgRed.bold(` ${str} `))
}
msg.error.full = function(str, err) {
    msg.error(str)
    console.error(err)
    msg.error(`***** End of error "${str}" *****`)
}


module.exports.serverError = function(req, res, error, options) {
    let info, userMsg
    if (typeof options === "string") {
        info = options
        userMsg = options
    } else {
        info = options.info
        userMsg = options.userMsg === false ? false : info
    }
    msg.error.full(`Error at ${req.url}.${info?" "+info:""}`, error)
    res.status(500).json(`Error 500: Internal server error.${userMsg?" "+userMsg:""} Report to Dug at dougalcedo@gmail.com.`)
}

module.exports.caseInsCompare = (s1, s2) => s1.toLowerCase() == s2.toLowerCase()
module.exports.caseInsStartsWith = (s1, s2) => s1.toLowerCase().startsWith(s2.toLowerCase())
module.exports.caseInsIncludes = (arr, s) => arr.filter(x => typeof x == 'string').map(s => s.toLowerCase()).includes(s.toLowerCase())
module.exports.toDugId = function(s) {
    if (caseInsStartsWith(s, 'dug')) {
        return s.toUpperCase()
    } else {
        let n = Number(s)
        if (isNaN(n)) return
        return `DUG${n < 10 ? "00"+n : n < 100 ? "0"+n : n}`
    }
}

module.exports.msg = msg