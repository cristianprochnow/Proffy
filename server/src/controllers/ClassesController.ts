import { Request, Response } from 'express'

import { connection } from '../database/connection'
import { convertHoursToMinutes } from '../utils/convertHoursToMinutes'

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

    const classes = await connection('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(filter.week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', filter.subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return response.json(classes)
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
