import {Router} from 'express'
import Home from './Home'
import Schedule from './Schedule'

const routes = Router()

routes.use('/', Home)
routes.use('/schedule', Schedule)

export default routes