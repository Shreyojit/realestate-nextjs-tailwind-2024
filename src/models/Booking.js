import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  numberOfGuests: { type: Number, required: true }, 
  rooms: [
    {
      roomNumber: {
        type: Number,
      },
      unavailableDates: {
        type: [Date],
        default: [],
      },
    },
   ],
   price: { type: Number, required: true }, // Change to Number if price is numeric
  place: { type: String, required: true },
  user: { type: String, required: true },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
