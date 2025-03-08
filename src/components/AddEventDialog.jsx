import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import { Cross2Icon, CalendarIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

const AddEventDialog = ({ isOpen, onClose, onAddEvent, djList = [] }) => {
  const [eventName, setEventName] = useState('');
  const [section, setSection] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedDjs, setSelectedDjs] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const sections = ['Miami Gold', 'BudFathers', "Son's Cues", 'Grewv Lounge'];
  
  const hours = Array.from({ length: 24 }, (_, i) => 
    i < 10 ? `0${i}:00` : `${i}:00`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      name: eventName,
      location: section,
      date: `${date} at ${time}`,
      djs: selectedDjs,
      // We'll handle the avatar later based on section
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
    });
    
    // Reset form
    setEventName('');
    setSection('');
    setDate('');
    setTime('');
    setSelectedDjs([]);
    onClose();
  };

  const toggleDj = (dj) => {
    if (selectedDjs.some(selectedDj => selectedDj.id === dj.id)) {
      setSelectedDjs(selectedDjs.filter(selectedDj => selectedDj.id !== dj.id));
    } else {
      setSelectedDjs([...selectedDjs, dj]);
    }
  };

  // Simple calendar for demo purposes
  const Calendar = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    
    return (
      <div className="bg-gray-800 p-3 rounded-md shadow-lg">
        <div className="grid grid-cols-7 gap-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={i} className="text-center text-xs text-gray-400">{day}</div>
          ))}
          {days.map(day => (
            <button
              key={day}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-600"
              onClick={() => {
                setDate(`${day}/01/2023`);
                setShowCalendar(false);
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/90 backdrop-blur-md border border-gray-700 p-6 rounded-lg shadow-xl w-full max-w-md">
          <Dialog.Title className="text-xl font-medium mb-4">Add New Event</Dialog.Title>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event name"
                  required
                />
              </div>
              
              {/* Section Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1">Section</label>
                <Select.Root value={section} onValueChange={setSection}>
                  <Select.Trigger className="w-full flex items-center justify-between px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Select.Value placeholder="Select a section" />
                    <Select.Icon>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  
                  <Select.Portal>
                    <Select.Content className="overflow-hidden bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                      <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-gray-800 text-gray-400">
                        <ChevronUpIcon />
                      </Select.ScrollUpButton>
                      
                      <Select.Viewport className="p-1">
                        {sections.map((sectionName) => (
                          <Select.Item
                            key={sectionName}
                            value={sectionName}
                            className="relative flex items-center px-6 py-2 rounded-md text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none cursor-pointer"
                          >
                            <Select.ItemText>{sectionName}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                      
                      <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-gray-800 text-gray-400">
                        <ChevronDownIcon />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
              
              {/* Date Field with Calendar */}
              <div>
                <label className="block text-sm font-medium mb-1">Date (DD/MM/YYYY)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="DD/MM/YYYY"
                    pattern="\d{1,2}/\d{1,2}/\d{4}"
                    required
                  />
                  
                  <Popover.Root open={showCalendar} onOpenChange={setShowCalendar}>
                    <Popover.Trigger asChild>
                      <button
                        type="button"
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600"
                      >
                        <CalendarIcon className="w-5 h-5" />
                      </button>
                    </Popover.Trigger>
                    
                    <Popover.Portal>
                      <Popover.Content sideOffset={5} align="end">
                        <Calendar />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              </div>
              
              {/* Time Field with Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1">Time (24hr format)</label>
                <Select.Root value={time} onValueChange={setTime}>
                  <Select.Trigger className="w-full flex items-center justify-between px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Select.Value placeholder="Select time" />
                    <Select.Icon>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  
                  <Select.Portal>
                    <Select.Content className="overflow-hidden bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                      <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-gray-800 text-gray-400">
                        <ChevronUpIcon />
                      </Select.ScrollUpButton>
                      
                      <Select.Viewport className="p-1 max-h-60">
                        {hours.map((hour) => (
                          <Select.Item
                            key={hour}
                            value={hour}
                            className="relative flex items-center px-6 py-2 rounded-md text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none cursor-pointer"
                          >
                            <Select.ItemText>{hour}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                      
                      <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-gray-800 text-gray-400">
                        <ChevronDownIcon />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
              
              {/* DJ Selection */}
              <div>
                <label className="block text-sm font-medium mb-1">Select DJs</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {djList.map(dj => (
                    <button
                      key={dj.id}
                      type="button"
                      className={`px-3 py-1 rounded-md text-sm ${
                        selectedDjs.some(selectedDj => selectedDj.id === dj.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                      onClick={() => toggleDj(dj)}
                    >
                      {dj.name}
                    </button>
                  ))}
                </div>
                {djList.length === 0 && (
                  <p className="text-sm text-gray-400 mt-1">No DJs available. Add DJs from the DJ List.</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  Cancel
                </button>
              </Dialog.Close>
              
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
              >
                Add Event
              </button>
            </div>
          </form>
          
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddEventDialog;