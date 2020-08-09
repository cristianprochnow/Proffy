import { connection } from '../database/connection'

interface IFilter {
  week_day: number
  subject: string
  time: string
}

class Classes {
  async byDayAndTimeAndSubject (filter: IFilter, time: number) {
    const { week_day, subject } = filter
    const timeInMinutes = time

    const filteredClasses = await connection('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return filteredClasses
  }
}

export { Classes }
