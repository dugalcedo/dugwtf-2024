const { msg } = require('./lib/util.js')
const { EXPRESS, APP, PORT, ABS } = require('./lib/env.js')
require('./db/db.js')

const DugscogController = require('./controllers/DugscogController.js')
// const UserController = require('./controllers/UserController.js')
const AudioController = require('./controllers/AudioController.js')
const HelpController = require('./controllers/HelpController.js')
// const ForumController = require('./controllers/ForumController.js')

APP.use('*', (req, res, next) => {
    // console.log(`heard ${req.method} @ ${req.url}`)
    console.log('hi')
    next()
})

APP.use('/api/dugscog', DugscogController)
// APP.use('/api/user', UserController)
APP.use('/api/audio', AudioController)
// APP.use('/forum', ForumController)
APP.use(EXPRESS.static('views'))
APP.use('/api', HelpController)

APP.get('/map', (req, res) => {
    res.redirect('/img/map.jpg')
})
APP.get('*', (req, res) => {
    res.sendFile(ABS('/views/index.html'))
    // res.redirect('/')
})

APP.listen(PORT, msg.big(`Now TEST listening on port ${PORT}.\nhttp://localhost:${PORT}`,{color: 'cyan'}))