import { connection } from '../database/connection'

class Connections {
  async insertUserId (userId: number) {
    return await connection('connections').insert({
      user_id: userId
    })
  }

  async countTotalConnections () {
    const totalConnections = await connection('connections')
      .count('* as total')

    const { total } = totalConnections[0]

    return total
  }
}

export { Connections }
