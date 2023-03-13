import {
  addDays,
  startOfMonth,
  endOfMonth,
  getDay,
  eachDayOfInterval,
  format,
  isSameDay
} from 'date-fns'

export default function Body({ currentDate, selectedDate, setSelectedDate }) {
  // get the first day of the current month
  const startDate = startOfMonth(currentDate)

  // get the last day of the current month
  const endDate = endOfMonth(currentDate)

  // get the weekday of the first day of the month (0 for Sunday)
  const startWeekday = getDay(startDate)

  // subtract the number of days to the previous week day
  const firstDayInWeek = addDays(startDate, -startWeekday)

  // calculate days that are not the same month
  const subtractNotSameMonth = eachDayOfInterval({
    start: firstDayInWeek,
    end: startDate
  })

  const wholeMonth = eachDayOfInterval({ start: startDate, end: endDate })

  // focus selected date
  const handleSelected = (date) => {
    setSelectedDate(date)
  }

  // don't display days that are not the same month
  const subtractDays = Array.from(
    { length: subtractNotSameMonth.length - 1 },
    (_, i) => <div key={i} />
  )

  const all = []
  for (let i = 0; i < wholeMonth.length; i++) {
    all.push(
      <div
        key={i}
        className={`body_day_text ${
          isSameDay(wholeMonth[i], selectedDate) ? 'selected' : ''
        }`}
        onClick={() => handleSelected(wholeMonth[i])}>
        {format(wholeMonth[i], 'd')}
      </div>
    )
  }

  return (
    <div className='body'>
      <div className='body_day'>
        {subtractDays}
        {all}
      </div>
    </div>
  )
}

{
  /* <ul className='calendars_daysWrap'>
        <li className='calendars_days hasData'>
          <div className='date'>
            <span className='num'>1</span>
            <span className='weekday'>星期四</span>
          </div>
          <span className='status'>候補</span>
          <span className='sell'>可賣：0</span>
          <span className='group'>團位：0</span>
          <span className='tip'>
            <i></i>保證出團
          </span>
          <span className='price'>$4,999</span>
        </li>
        <li className='calendars_days hasData'>
          <div className='date'>
            <span className='num'>1</span>
            <span className='weekday'>星期五</span>
          </div>
          <span className='status'>候補</span>
          <span className='sell'>可賣：0</span>
          <span className='group'>團位：0</span>
          <span className='tip'>
            <i className='ic-ln productreferf'></i>保證出團
          </span>
          <span className='price'>$4,999</span>
        </li>
      </ul> */
}
