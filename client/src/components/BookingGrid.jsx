const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const BookingGrid = ({ roomName }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-bold text-lg mb-4">{roomName}</h3>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((time) => (
          <button 
            key={time}
            className="py-2 px-4 bg-blue-50 hover:bg-blue-500 hover:text-white border border-blue-200 rounded transition"
            onClick={() => alert(`Booking ${roomName} at ${time}`)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};