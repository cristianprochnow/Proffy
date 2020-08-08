import { Request, Response } from 'express'

import { connection } from '../database/connection'
import { convertHoursToMinutes } from '../utils/convertHoursToMinutes'

interface IScheduleItem {
  week_day: number
  from: string
  to: string
}

class ClassController {
  async store (request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body

    const transaction = await connection.transaction()

    try {
      const insertedUsersIds = await transaction('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })

      const user_id = insertedUsersIds[0]

      const insertedClassesIds = await transaction('classes').insert({
        subject,
        cost,
        user_id
      })

      const class_id = insertedClassesIds[0]

      const classSchedule = schedule.map((scheduleItem: IScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to)
        }
      })

      await transaction('class_schedule').insert(classSchedule)

      await transaction.commit()

      return response.status(201).send()
    } catch (error) {
      await transaction.rollback()

      return response.status(400).json({
        error: 'Unexpected error while creating new class.',
        description: error
      })
    }
  }
}

export { ClassController }
