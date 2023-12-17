import { msg } from './lib/util.js'
import { EXPRESS, APP, PORT, ABS } from './lib/env.js'
import './db/db.js'

import DugscogController from './controllers/DugscogController.js'
import UserController from './controllers/UserController.js'
import AudioController from './controllers/AudioController.js'
import HelpController from './controllers/HelpController.js'
import ForumController from './controllers/ForumController.js'

APP.use('/api/dugscog', DugscogController)
APP.use('/api/user', UserController)
APP.use('/api/audio', AudioController)
APP.use('/forum', ForumController)
APP.use(EXPRESS.static('views'))
APP.use('/api', HelpController)
APP.get('*', (req, res) => {
    res.sendFile(ABS('/views/index.html'))
})

APP.listen(PORT, msg.big(`Now listening on port ${PORT}.\nhttp://localhost:${PORT}`,{color: 'cyan'}))