import { Request, Response } from 'express'

import { connection } from '../database/connection'
import { convertHoursToMinutes } from '../utils/convertHoursToMinutes'

import { Classes } from '../models/Classes'

interface IScheduleItem {
  week_day: number
  from: string
  to: string
}

interface IFilterParams {
  week_day: number
  subject: string
  time: string
}

const classes = new Classes()

class ClassesController {
  async index (request: Request, response: Response) {
    const filter: IFilterParams = request.query

    if (
      !filter.week_day ||
      !filter.subject ||
      !filter.time
    ) {
      return response.json({
        error: 'Missing filter to search classes.'
      })
    }

    const timeInMinutes = convertHoursToMinutes(filter.time)

    const filteredClasses = await classes
      .byDayAndTimeAndSubject(filter, timeInMinutes)

    return response.json(filteredClasses)
  }

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
        subject: 'Unexpected error while creating new class.',
        description: error
      })
    }
  }
}

export { ClassesController }
