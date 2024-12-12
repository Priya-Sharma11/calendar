import React, { useState, useEffect } from 'react';
import { getDaysInMonth } from '../utils/calendar';
import CalendarHeader from '../components/CalendarHeader';
import DayCell from '../components/DayCell';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [eventDetails, setEventDetails] = useState({ name: '', startTime: '', endTime: '', description: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const today = new Date();
  const currentDay = today.getDate();

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      setEvents(parsedEvents);
    }
  }, []);

  // Save events to localStorage whenever events state changes
  useEffect(() => {
    if (Object.keys(events).length > 0) { // Only save if there are events
      localStorage.setItem('events', JSON.stringify(events));
    }
  }, [events]);

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11; // December
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0; // January
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    // Keep the selected date within the valid range of days in the new month
    const daysInNewMonth = getDaysInMonth(newMonth, newYear);
    if (selectedDate.date > daysInNewMonth) {
      setSelectedDate({ ...selectedDate, date: daysInNewMonth });
    } else {
      setSelectedDate({ ...selectedDate, month: newMonth, year: newYear });
    }
  };

  const handleAddEvent = () => {
    if (!eventDetails.name || !eventDetails.startTime || !eventDetails.endTime) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (eventDetails.startTime >= eventDetails.endTime) {
      alert('End time must be after the start time.');
      return;
    }
  
    const eventKey = `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`;
    
    // Check for overlapping events
    const existingEvents = events[eventKey] || [];
    
    const isOverlapping = existingEvents.some((existingEvent) => {
      const existingStart = new Date(`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.date}T${existingEvent.startTime}`);
      const existingEnd = new Date(`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.date}T${existingEvent.endTime}`);
      const newStart = new Date(`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.date}T${eventDetails.startTime}`);
      const newEnd = new Date(`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.date}T${eventDetails.endTime}`);
      
      // Check if the new event overlaps with any existing event
      return (newStart < existingEnd && newEnd > existingStart);
    });
  
    if (isOverlapping) {
      alert('The event overlaps with an existing event. Please choose a different time.');
      return;
    }
  
    // Proceed to add the event
    const updatedEvents = { ...events };
  
    if (!updatedEvents[eventKey]) {
      updatedEvents[eventKey] = [];
    }
  
    const newEvent = { ...eventDetails };
  
    if (editingIndex !== null) {
      updatedEvents[eventKey][editingIndex] = newEvent;
    } else {
      updatedEvents[eventKey].push(newEvent);
    }
  
    setEvents(updatedEvents);
    setEventDetails({ name: '', startTime: '', endTime: '', description: '' });
    setEditingIndex(null);
  };
  

  const days = getDaysInMonth(currentMonth, currentYear);

  const getEventsForSelectedDate = () => {
    const eventKey = `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`;
    return events[eventKey] || [];
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow p-6">
        {/* Calendar Header */}
        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          handleMonthChange={handleMonthChange}
        />

        {/* Days Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {days.map((day, index) => (
            <DayCell
              key={index}
              day={day}
              currentDay={currentDay}
              currentMonth={currentMonth}
              currentYear={currentYear}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              events={events}
            />
          ))}
        </div>

        {/* Event Form */}
        {selectedDate && (
         <EventForm
         eventDetails={eventDetails}
         setEventDetails={setEventDetails}
         handleAddEvent={handleAddEvent}
         editingIndex={editingIndex}
         setEditingIndex={setEditingIndex}
         eventsForSelectedDate={getEventsForSelectedDate()} // Pass filtered events
         setEvents={setEvents}
       />
       
        )}
      </div>

      {/* Event List */}
      <div className="w-2/4 bg-gray-100 p-8 border-l">
        <EventList
          selectedDate={selectedDate}
          events={events}
          setEventDetails={setEventDetails}
          setEditingIndex={setEditingIndex}
          setEvents={setEvents}
        />
      </div>
    </div>
  );
};

export default Calendar;
