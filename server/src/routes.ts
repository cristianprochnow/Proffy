import { Router } from 'express'
import { ClassController } from './controllers/ClassController'

const routes = Router()

const classController = new ClassController()

routes.post('/classes', classController.store)

export { routes }
