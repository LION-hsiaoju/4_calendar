import data1 from './data1.json'
import data2 from './data2.json'
import data3 from './data3.json'
import data4 from './data4.json'

import { isSameDay } from 'date-fns'

let newData2 = data2.map(({ certain, date, price, onsell, total, state }) => ({
  guaranteed: certain,
  date,
  price,
  availableVancancy: onsell,
  totalVacnacy: total,
  status: state
}))

const data = [...data1, ...newData2, ...data3, ...data4]
  .map((item) => {
    return {
      guaranteed: item.guaranteed,
      date: new Date(item.date),
      price: item.price,
      availableVancancy: item.availableVancancy,
      totalVacnacy: item.totalVacnacy,
      status: item.status
    }
  })
  // 把所有資料照日期排
  .sort((a, b) => a.date - b.date)

// 如果資料裡有符合「這個月的日期」的團的話
// 回傳一個「這個日期的所有團」的 result 陣列
export const getEventDetail = (arr, day) => {
  const result = arr.filter((d) => isSameDay(d.date, day))
  return result
}

export const allData = data
