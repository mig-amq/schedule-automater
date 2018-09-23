import path from 'path'
import bp from 'body-parser'
import express from 'express'
import config from './config'
import session from 'express-session'
import routes from './build/controllers'

console.clear()
const app = express()

app.listen(config.SERVER.port, () => {
  config.LOG.inf('\nServer Started - ' + config.SERVER.port)
})

// initialize middlewares
app.use(bp.urlencoded(config.BODYPARSER))
config.LOG.scs("Body Parser initialized...")

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, config.EXPRESS.views))
config.LOG.scs("HBS initialized...")

app.use(session(config.SESSION))
config.LOG.scs("Express Session initialized...")

app.use(express.static(config.EXPRESS.statics))
config.LOG.scs("Static files initialized...")

app.use('/', routes)
config.LOG.scs("Routes initialized...")