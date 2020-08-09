import { Request, Response } from 'express'

import { connection } from '../database/connection'

import { Connections } from '../models/Connections'

const connections = new Connections()

class ConnectionsController {
  async index (request: Request, response: Response) {
    const totalConnections = await connections.countTotalConnections()

    return response.json({ totalConnections })
  }

  async store (request: Request, response: Response) {
    const { user_id } = request.body

    await connections.insertUserId(user_id)

    return response.status(201).send()
  }
}

export { ConnectionsController }
