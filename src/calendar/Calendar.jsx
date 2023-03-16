import { useState } from 'react'
import { addMonths } from 'date-fns'

import Header from './Header'
import SubHeader from './SubHeader'
import Body from './Body'

// new Date(2017, 6, 15) => the month is 0-indexed
const initialDate = [2017, 5, 15]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(...initialDate))
  const [selectedDate, setSelectedDate] = useState(new Date(null))

  const prevMonth = addMonths(currentDate, -1)
  const currentMonth = addMonths(currentDate, 0)
  const nextMonth = addMonths(currentDate, 1)

  const [shownMonth, setShownMonth] = useState([
    prevMonth,
    currentMonth,
    nextMonth
  ])

  const [activeTab, setActiveTab] = useState(1)

  const handleSelectedMonth = (index) => {
    setActiveTab(index)
    setCurrentDate(shownMonth[index])
  }

  const handlePrevMonth = () => {
    const date = addMonths(currentDate, -1)
    setShownMonth([date, currentMonth, nextMonth])
    setCurrentDate(date)
    if (activeTab === 1) {
      setActiveTab(0)
    } else if (activeTab === 2) {
      setActiveTab(1)
      setShownMonth([addMonths(date, -1), date, currentMonth])
    }
  }

  const handleNextMonth = () => {
    const date = addMonths(currentDate, 1)
    setShownMonth([prevMonth, currentMonth, date])
    setCurrentDate(date)
    if (activeTab === 1) {
      setActiveTab(2)
    } else if (activeTab === 0) {
      setActiveTab(1)
      setShownMonth([currentMonth, date, addMonths(date, 1)])
    }
  }

  const props = {
    shownMonth,
    activeTab,
    setActiveTab,
    setCurrentDate,
    setShownMonth,
    handleSelectedMonth,
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
