export default function Header({ props }) {
  return (
    <div className='header'>
      <button className='header_arrow' onClick={props.handlePrevMonth}>
        <ion-icon name='caret-back-outline'></ion-icon>
      </button>
      <div className='header_month'>
        <button className='header_month_content'>
          <h2>{props.prevMonth}</h2>
        </button>

        <button className='header_month_content focus'>
          <h2>{props.currentMonth}</h2>
        </button>

        <button className='header_month_content'>
          {/* 沒有活動的月份要加入 「無出發日」
          <p className='header_month_content_text'>無出發日</p>
          */}
          <h2>{props.nextMonth}</h2>
        </button>
      </div>
      <button className='header_arrow' onClick={props.handleNextMonth}>
        <ion-icon name='caret-forward-outline'></ion-icon>
      </button>
    </div>
  )
}
