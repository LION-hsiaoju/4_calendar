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

  const handleSwitchMonth = (type) => {
    let index = type === 'prev' ? -1 : 1
    const date = addMonths(currentDate, index)
    setCurrentDate(date)

    switch (type) {
      case 'prev':
        setShownMonth([date, currentMonth, nextMonth])
        if (activeTab === 1) {
          setActiveTab(0)
        } else if (activeTab === 2) {
          setActiveTab(1)
          setShownMonth([addMonths(date, -1), date, currentMonth])
        }
        break

      case 'next':
        setShownMonth([prevMonth, currentMonth, date])
        if (activeTab === 1) {
          setActiveTab(2)
        } else if (activeTab === 0) {
          setActiveTab(1)
          setShownMonth([currentMonth, date, addMonths(date, 1)])
        }
        break
      default:
        break
    }
  }

  const props = {
    shownMonth,
    activeTab,
    setActiveTab,
    setCurrentDate,
    setShownMonth,
    handleSelectedMonth,
    handleSwitchMonth
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
