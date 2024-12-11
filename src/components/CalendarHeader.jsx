import React from 'react';

const CalendarHeader = ({ currentMonth, currentYear, handleMonthChange }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className="flex justify-between items-center mb-4 border-b pb-3">
      <button
        onClick={() => handleMonthChange(-1)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
      >
        &lt;
      </button>
      <h2 className="text-lg font-semibold">
        {monthNames[currentMonth]} {currentYear}
      </h2>
      <button
        onClick={() => handleMonthChange(1)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
      >
        &gt;
      </button>
    </div>
  );
};

export default CalendarHeader;
