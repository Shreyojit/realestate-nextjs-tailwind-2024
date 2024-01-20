import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
 
checkIn: {type:Date, required:true},
checkOut: {type:Date, required:true},

  name: {type:String, required:true},
  
  phone: {type:String, required:true},
 

  price: {type:Number, required:true},
  place: {type:String, required:true,},
  user: {type:String, required:true},
  
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;