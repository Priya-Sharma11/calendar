import React from 'react';

const EventForm = ({
  eventDetails,
  setEventDetails,
  handleAddEvent,
  editingIndex,
  setEditingIndex,
  eventsForSelectedDate, // Get events for the selected date
  setEvents,
}) => {
  // Function to check if the new event overlaps with any existing event
  const checkForOverlap = (newEvent) => {
    for (let event of eventsForSelectedDate) {
      const eventStart = new Date(`1970-01-01T${event.startTime}:00`);
      const eventEnd = new Date(`1970-01-01T${event.endTime}:00`);
      const newEventStart = new Date(`1970-01-01T${newEvent.startTime}:00`);
      const newEventEnd = new Date(`1970-01-01T${newEvent.endTime}:00`);

      // Check for overlap conditions
      if (
        (newEventStart < eventEnd && newEventStart >= eventStart) || // New event starts before the existing one ends
        (newEventEnd <= eventEnd && newEventEnd > eventStart) || // New event ends after the existing one starts
        (newEventStart <= eventStart && newEventEnd >= eventEnd) // New event completely overlaps the existing one
      ) {
        return true; // Overlap found
      }
    }
    return false; // No overlap
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if the event overlaps with any existing events
    if (checkForOverlap(eventDetails)) {
      alert('Event time overlaps with an existing event. Please choose another time.');
      return; // Exit if there is an overlap
    }

    // Proceed with adding the event if no overlap
    handleAddEvent();
  };

  return (
    <div className="p-4 bg-white border rounded shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        {editingIndex !== null ? 'Edit Event' : 'Add Event'}
      </h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={eventDetails.name}
          onChange={(e) =>
            setEventDetails({ ...eventDetails, name: e.target.value })
          }
          placeholder="Event Name"
          className="mb-2 p-2 w-full border rounded"
          required
        />
        <div className="mb-2">
          <input
            type="time"
            value={eventDetails.startTime}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, startTime: e.target.value })
            }
            className="mb-2 p-2 w-full border rounded"
            required
          />
          <input
            type="time"
            value={eventDetails.endTime}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, endTime: e.target.value })
            }
            className="p-2 w-full border rounded"
            required
          />
        </div>
        <textarea
          value={eventDetails.description}
          onChange={(e) =>
            setEventDetails({ ...eventDetails, description: e.target.value })
          }
          placeholder="Event Description"
          className="mb-4 p-2 w-full border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingIndex !== null ? 'Update Event' : 'Add Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
