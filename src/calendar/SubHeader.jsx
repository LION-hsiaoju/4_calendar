import { format, addDays, startOfWeek } from 'date-fns'
import { zhTW } from 'date-fns/locale'

export default function SubHeader({ currentDate }) {
  const weekStart = startOfWeek(currentDate)
  const weekDays = []

  for (let day = 0; day < 7; day++) {
    weekDays.push(
      <h2 key={day} className='subHeader_text'>
        {format(addDays(weekStart, day), 'EEEE', { locale: zhTW })}
      </h2>
    )
  }

  return <div className='subheader'>{weekDays}</div>
}
