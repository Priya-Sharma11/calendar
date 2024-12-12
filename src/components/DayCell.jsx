import React from 'react';

const DayCell = ({ day, currentDay, currentMonth, currentYear, selectedDate, setSelectedDate, events }) => {
  const isToday =
    day === currentDay && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
  const isSelected = day === selectedDate.date; // Updated to check for selectedDate's date
  const eventKey = `${currentYear}-${currentMonth}-${day}`;
  const hasEvent = events[eventKey] && events[eventKey].length > 0;

  return (
    <div
      className={`p-4 border rounded text-center cursor-pointer ${isToday ? 'bg-gray-600 text-white font-bold' : ''} ${isSelected ? 'bg-blue-300 text-white' : ''} ${hasEvent ? 'bg-gray-300' : ''} ${day === 0 ? 'text-red-500' : ''}`}
      onClick={() => setSelectedDate({ date: day, month: currentMonth, year: currentYear })}
    >
      <div>{day || ''}</div>
    </div>
  );
};

export default DayCell;
