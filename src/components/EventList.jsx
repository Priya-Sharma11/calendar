import React from 'react';

const EventList = ({ selectedDate, events, setEventDetails, setEditingIndex, setEvents }) => {
  const selectedDateEventsKey = `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`;
  const selectedDateEvents = events[selectedDateEventsKey] || [];

  const handleDeleteEvent = (index) => {
    const updatedEvents = events[selectedDateEventsKey].filter((_, idx) => idx !== index);
    setEvents((prev) => ({
      ...prev,
      [selectedDateEventsKey]: updatedEvents,
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Events </h3>
      {selectedDateEvents.length > 0 ? (
        <ul>
          {selectedDateEvents.map((event, idx) => (
            <li key={idx} className="mb-4 p-2 border-b">
              <div className="font-bold">{event.name}</div>
              <div>{event.startTime} - {event.endTime}</div>
              <div className="text-sm text-gray-600">{event.description}</div>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => {
                    setEventDetails(event);
                    setEditingIndex(idx);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(idx)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No events added yet.</p>
      )}
    </div>
  );
};

export default EventList;
