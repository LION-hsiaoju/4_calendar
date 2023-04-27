import { allData } from '../data/allData'
import { format, getYear, getMonth } from 'date-fns'

export default function Header({ props }) {
  // get month with events
  const monthWithEvents = allData.map((item) => {
    let date = new Date(item.date)
    const year = getYear(date).toString()
    const month = (getMonth(date) + 1).toString()
    date = year + '/' + month
    return date
  })

  // remove duplicate months
  let showNoDepartDay = [...new Set(monthWithEvents)]

  return (
    <div className='header'>
      <button
        className='header_arrow'
        onClick={() => props.handleSwitchMonth('prev')}>
        <ion-icon name='caret-back-outline'></ion-icon>
      </button>

      <div className='header_month'>
        {props.shownMonth.map((item, index) => (
          <button
            key={index}
            className={`header_month_content ${
              index === props.activeTab ? 'focus' : ''
            }`}
            onClick={() => props.handleSelectedMonth(index)}>
            <h2>{format(item, 'yyyy M月')}</h2>

            {showNoDepartDay.includes(
              getYear(item).toString() + '/' + (getMonth(item) + 1).toString()
            ) ? (
              <></>
            ) : (
              <p className='header_month_content_text'>無出發日</p>
            )}
          </button>
        ))}
      </div>

      <button
        className='header_arrow'
        onClick={() => props.handleSwitchMonth('next')}>
        <ion-icon name='caret-forward-outline'></ion-icon>
      </button>
    </div>
  )
}
