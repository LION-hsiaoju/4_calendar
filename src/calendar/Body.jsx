import { allData, getEventDetail } from '../data/allData'

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

  // 得到整個月的所有 new Date()
  const wholeMonth = eachDayOfInterval({ start: startDate, end: endDate })

  // focus selected date
  const handleSelected = (date) => setSelectedDate(date)

  // don't display days that are not the same month
  const subtractDays = Array.from(
    { length: subtractNotSameMonth.length - 1 },
    (_, i) => <div key={i} />
  )

  // render 整個月並加上活動資料
  let all = wholeMonth.map((day, index) => {
    const detail = getEventDetail(allData, day)

    // 如果一天有超過一個行程，價格由低至高排列，只顯示最便宜的
    const sortPrice = detail.sort((a, b) => a.price - b.price)

    return (
      <div
        key={index}
        className={`body_day ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
        onClick={() => handleSelected(day)}>
        <div className='body_day_content'>
          {format(day, 'd')}
          {detail.length < 2 &&
            detail.map((_, index) => (
              <div key={index} className='guaranteed'>
                成團
              </div>
            ))}
        </div>

        {/* 當天只有一個團 */}
        {detail.length === 1 &&
          detail.map((item, index) => (
            <div key={index}>
              <p
                className={`body_day_content_text ${
                  item.status === '預定' || item.status === '報名'
                    ? 'orange'
                    : ''
                } ${item.status === '後補' ? 'green' : ''} ${
                  item.status === '額滿' || item.status === '截止' ? 'gray' : ''
                }`}>
                {item.status}
              </p>
              <p>可賣：{item.availableVancancy}</p>
              <p>團位：{item.totalVacnacy}</p>
              <p className='red'>
                {item.price.toLocaleString('zh-tw', {
                  style: 'currency',
                  currency: 'TWD',
                  maximumSignificantDigits: 4
                })}
              </p>
            </div>
          ))}

        {/* 當天超過一個團 */}
        {detail.length > 1 && (
          <>
            <p className='body_day_content_more'>
              <span>看更多團</span>
              <ion-icon name='caret-forward-outline' />
            </p>
            <br />
            <p className='red'>
              {sortPrice[0].price.toLocaleString('zh-tw', {
                style: 'currency',
                currency: 'TWD',
                maximumSignificantDigits: 4
              })}
              <span> 起</span>
            </p>
          </>
        )}
      </div>
    )
  })

  return (
    <div className='body'>
      {subtractDays}
      {all}
    </div>
  )
}
