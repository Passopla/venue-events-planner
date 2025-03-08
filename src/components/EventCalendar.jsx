import { useState, useEffect } from 'react'
import EventList from './EventList'
import MonthCalendar from './MonthCalendar'
import AddEventDialog from './AddEventDialog'
import DjList from './DjList'

const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState('January')
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [djs, setDjs] = useState([
    { id: 1, name: 'DJ Spinmaster', genres: 'Hip-Hop, R&B', color: 'from-purple-500 to-indigo-500' },
    { id: 2, name: 'Beatrix', genres: 'House, Techno', color: 'from-orange-500 to-pink-500' },
    { id: 3, name: 'Vinyl Virtuoso', genres: 'Funk, Soul, Disco', color: 'from-yellow-400 to-orange-500' },
    { id: 4, name: 'Mixology', genres: 'EDM, Trance', color: 'from-blue-500 to-indigo-500' },
    { id: 5, name: 'Rhythm Raider', genres: 'Reggae, Dancehall', color: 'from-green-400 to-teal-500' },
  ])
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Summer Beats Festival",
      date: 'January 10th, 2022 at 5:00 PM',
      location: 'Miami Gold',
      djs: [djs[0], djs[2]],
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    {
      id: 2,
      name: "Tech Conference 2022",
      date: 'January 12th, 2022 at 3:00 PM',
      location: 'BudFathers',
      djs: [djs[1]],
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
    },
    {
      id: 3,
      name: "Networking Mixer",
      date: 'January 12th, 2022 at 5:00 PM',
      location: "Son's Cues",
      djs: [djs[3], djs[4]],
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg'
    },
    {
      id: 4,
      name: "Charity Gala Dinner",
      date: 'January 14th, 2022 at 10:00 AM',
      location: 'Grewv Lounge',
      djs: [djs[2]],
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      id: 5,
      name: "Corporate Retreat",
      date: 'January 14th, 2022 at 12:00 PM',
      location: 'Miami Gold',
      djs: [djs[0], djs[1]],
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg'
    }
  ])
  
  const handleAddEvent = (newEvent) => {
    const event = {
      ...newEvent,
      id: events.length + 1
    }
    setEvents([...events, event])
  }

  const handleAddDj = (newDj) => {
    setDjs([...djs, newDj])
  }
  
  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ))
  }
  
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-bold">Upcoming Events</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <EventList 
            events={events} 
            onUpdateEvent={handleUpdateEvent}
            djList={djs}
          />
        </div>
        
        <div className="w-full lg:w-96">
          <MonthCalendar 
            month={currentMonth} 
            onPrevMonth={() => setCurrentMonth('December')} 
            onNextMonth={() => setCurrentMonth('February')} 
          />
          
          <button 
            className="w-full mt-4 bg-indigo-600/80 backdrop-blur-sm hover:bg-indigo-700/90 text-white py-3 px-4 rounded-md transition-colors"
            onClick={() => setIsAddEventOpen(true)}
          >
            Add event
          </button>
          
          <DjList djs={djs} onAddDj={handleAddDj} />
        </div>
      </div>
      
      <AddEventDialog 
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onAddEvent={handleAddEvent}
        djList={djs}
      />
    </div>
  )
}

export default EventCalendar