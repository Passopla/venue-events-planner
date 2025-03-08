import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useState } from 'react';
import EditEventDialog from './EditEventDialog';

const EventList = ({ events = [], djList = [], onUpdateEvent }) => {
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEditEvent = (updatedEvent) => {
    // In a real app, you would update your state or database
    console.log('Event updated:', updatedEvent);
    if (onUpdateEvent) {
      onUpdateEvent(updatedEvent);
    }
    alert(`Event "${updatedEvent.name}" updated successfully!`);
    setEditingEvent(null);
  };

  return (
    <div className="space-y-4">
      {events.map(event => (
        <div 
          key={event.id} 
          className="flex items-start gap-4 p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
        >
          <img 
            src={event.avatar} 
            alt={event.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <h3 className="font-medium text-lg">{event.name}</h3>
            <div className="flex items-center gap-2 text-gray-300 mt-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 mt-1">
              <LocationIcon className="w-4 h-4" />
              <span>
                {event.location}
                {event.djs && event.djs.length > 0 && (
                  <span className="ml-2 text-gray-400">
                    • {event.djs.map(dj => dj.name).join(', ')}
                  </span>
                )}
              </span>
            </div>
          </div>
          
          <button 
            className="text-gray-400 hover:text-white"
            onClick={() => setEditingEvent(event)}
          >
            <DotsHorizontalIcon className="w-5 h-5" />
          </button>
        </div>
      ))}

      {/* EditEventDialog should be outside the mapping loop */}
      {editingEvent && (
        <EditEventDialog
          event={editingEvent}
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={handleEditEvent}
          djList={djList}
        />
      )}
    </div>
  );
};

// Simple icon components
const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
  </svg>
);

const LocationIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
  </svg>
);

export default EventList;