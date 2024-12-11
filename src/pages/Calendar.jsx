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
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDetails, setEventDetails] = useState({ name: '', startTime: '', endTime: '', description: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const today = new Date();
  const currentDay = today.getDate();

  // Load events from localStorage on component mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
    setEvents(storedEvents);
  }, []);

  // Save events to localStorage whenever events state changes
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
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
    setSelectedDate(null);
  };

  const handleAddEvent = () => {
    if (!eventDetails.name || !eventDetails.startTime || !eventDetails.endTime) {
      alert("Please fill in all fields.");
      return;
    }

    // Generate event key
    const eventKey = `${currentYear}-${currentMonth}-${selectedDate}`;
    const updatedEvents = { ...events };

    // If the event key doesn't exist, create an empty array for that date
    if (!updatedEvents[eventKey]) {
      updatedEvents[eventKey] = [];
    }

    // Add or update event
    const newEvent = { ...eventDetails };

    if (editingIndex !== null) {
      updatedEvents[eventKey][editingIndex] = newEvent;
    } else {
      updatedEvents[eventKey].push(newEvent);
    }

    // Update state and localStorage
    setEvents(updatedEvents);
    setEventDetails({ name: '', startTime: '', endTime: '', description: '' });
    setEditingIndex(null);

    // Debugging: Log the updated events to check if the event is being added
    console.log("Updated Events:", updatedEvents);
  };

  const days = getDaysInMonth(currentMonth, currentYear);

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
          />
        )}
      </div>

      {/* Event List */}
      <div className="w-1/4 bg-gray-100 p-4 border-l">
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
