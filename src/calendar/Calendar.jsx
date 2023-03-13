import { useState } from 'react'
import { format, subMonths, addMonths, isAfter, isBefore } from 'date-fns'

// import { allData } from '../data/allData'

import Header from './Header'
import SubHeader from './SubHeader'
import Body from './Body'

// new Date(2017, 6, 15) => the month is 0-indexed
const initialDate = [2017, 5, 15]

export default function Calendar() {
  // data.json date: 2016-11 ~ 2018-12
  const minDate = new Date('2016-12-01')
  const maxDate = new Date('2018-12-31')

  const [currentDate, setCurrentDate] = useState(new Date(...initialDate))
  const [selectedDate, setSelectedDate] = useState(new Date(2017, 6, 18))

  const currentMonth = format(currentDate, 'yyyy MM月')
  const prevMonth = format(addMonths(currentDate, -1), 'yyyy MM月')
  const nextMonth = format(addMonths(currentDate, 1), 'yyyy MM月')

  const handlePrevMonth = () => {
    const date = subMonths(currentDate, 1)
    if (isBefore(date, minDate)) return
    setCurrentDate(date)
  }

  const handleNextMonth = () => {
    const date = addMonths(currentDate, 1)
    if (isAfter(date, maxDate)) return
    setCurrentDate(date)
  }

  const props = {
    currentMonth,
    prevMonth,
    nextMonth,
    handlePrevMonth,
    handleNextMonth
  }

  return (
    <div className='calendar'>
      <Header props={props} />
      <SubHeader currentDate={currentDate} />
      <Body
        currentDate={currentDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  )
}
