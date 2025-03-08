import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

// Update the calendar styling in MonthCalendar.jsx
const MonthCalendar = ({ month, onPrevMonth, onNextMonth }) => {
  // This is a simplified calendar for January
  const days = [
    { day: 27, isCurrentMonth: false }, { day: 28, isCurrentMonth: false }, { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false }, { day: 31, isCurrentMonth: false }, { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true }, { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true }, { day: 6, isCurrentMonth: true }, { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true }, { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true, isSelected: true }, { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true }, { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true, isToday: true },
    { day: 23, isCurrentMonth: true }, { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true }, { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }, { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false }, { day: 5, isCurrentMonth: false }, { day: 6, isCurrentMonth: false }
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrevMonth} className="p-1 rounded-full hover:bg-white/20">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-medium">{month}</h2>
        <button onClick={onNextMonth} className="p-1 rounded-full hover:bg-white/20">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        <div className="text-gray-400">M</div>
        <div className="text-gray-400">T</div>
        <div className="text-gray-400">W</div>
        <div className="text-gray-400">T</div>
        <div className="text-gray-400">F</div>
        <div className="text-gray-400">S</div>
        <div className="text-gray-400">S</div>
        
        {days.map((day, index) => (
          <div 
            key={index}
            className={`
              aspect-square flex items-center justify-center rounded-full
              ${!day.isCurrentMonth ? 'text-gray-500' : ''}
              ${day.isToday ? 'bg-indigo-600 text-white' : ''}
              ${day.isSelected && !day.isToday ? 'text-indigo-400' : ''}
              ${day.isCurrentMonth && !day.isToday ? 'hover:bg-gray-600 cursor-pointer' : ''}
            `}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthCalendar