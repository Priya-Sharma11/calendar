import React from 'react';


const EventForm = ({ eventDetails, setEventDetails, handleAddEvent, editingIndex, setEditingIndex }) => {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-100">
      <h3 className="text-xl font-semibold mb-4">Add/Edit Event</h3>
      <label>
        Event Name:
        <input
          type="text"
          value={eventDetails.name}
          onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
          className="mt-2 p-2 border rounded w-full"
        />
      </label>
      <label>
        Start Time:
        <input
          type="time"
          value={eventDetails.startTime}
          onChange={(e) => setEventDetails({ ...eventDetails, startTime: e.target.value })}
          className="mt-2 p-2 border rounded w-full"
        />
      </label>
      <label>
        End Time:
        <input
          type="time"
          value={eventDetails.endTime}
          onChange={(e) => setEventDetails({ ...eventDetails, endTime: e.target.value })}
          className="mt-2 p-2 border rounded w-full"
        />
      </label>
      <label>
        Description:
        <textarea
          value={eventDetails.description}
          onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
          className="mt-2 p-2 border rounded w-full"
        />
      </label>
      <button
        onClick={handleAddEvent}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
      >
        {editingIndex !== null ? 'Save Changes' : 'Add Event'}
      </button>
    </div>
  );
};

export default EventForm;
