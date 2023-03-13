import {
  addDays,
  startOfMonth,
  getDay,
  getDate,
  getMonth,
  getYear,
  getDaysInMonth,
  eachDayOfInterval,
  format
} from 'date-fns'
// import { Fragment } from 'react'

export default function Body({ currentDate, selectedDate, setSelectedDate }) {
  // get the first day of the current month
  const startDate = startOfMonth(currentDate)

  // get the weekday of the first day of the month (0 for Sunday)
  const startWeekday = getDay(startDate)

  // subtract the number of days to the previous week day
  const firstDayInWeek = addDays(startDate, -startWeekday)

  // calculate days that are not the same month
  const subtractNotSameMonth = eachDayOfInterval({
    start: firstDayInWeek,
    end: startDate
  })

  // convert selectedDate to Number
  const formattedSelectedDate = Number(format(selectedDate, 'd'))
  
  // focus selected date
  const handleSelected = (i) => {
    const date = new Date(getYear(selectedDate), getMonth(selectedDate) - 1, i)
    setSelectedDate(date)
  }

  // const date = new Date(getYear(selectedDate), getMonth(selectedDate) - 1, i)

  // don't display days that are not the same month
  const subtractDays = Array.from(
    { length: subtractNotSameMonth.length - 1 },
    (_, i) => <div key={i} />
  )
  const days = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => (
    <div
      key={i}
      className={`body_day_text ${
        i + 1 === formattedSelectedDate ? 'selected' : ''
      }`}
      onClick={() => handleSelected(i + 1)}>
      {i + 1}
    </div>
  ))

  return (
    <div className='body'>
      <div className='body_day'>
        {subtractDays}
        {days}
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
