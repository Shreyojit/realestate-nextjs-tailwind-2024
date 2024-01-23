
"use client"



import React, { useEffect, useState } from 'react'

const Booking = (ctx) => {
const id =ctx.params.id



const [booking, setBooking] = useState(null);


const handleCheckout = async () => {
}


useEffect(() => {
  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/booking/${id}`);
      const data = await response.json();

      if (!response.ok) {
        console.error('Error fetching booking details:', data.error);
      } else {
        setBooking(data);
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  if (id) {
    fetchBookingDetails();
  }
}, [id]);

console.log(booking)



const taxRate = 0.125; // 12.5%
const taxPrice = booking ? booking.price * taxRate : 0;

const totalPrice = booking ? taxPrice + booking.price : 0;



  return (

    
   
     <div className=" bg-gray-100 px-20 pt-8">
    <h1 className="mb-4 text-xl">{`Booking Id: ${id}`}</h1>
 
   <div className="mt-8 mb-8 grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr]">
     <div>
       <div className="my-4">
         <h2 className="font-semibold text-2xl">Property Name</h2>
         {booking?.listingName}

          
        


       </div>


       {booking && (
            <>
              Name: {booking?.name}<br />
              Phone Number: {booking?.phone}<br />
              Check-in :  {new Date(booking.checkIn).toLocaleDateString()}<br />
            Check-out :  {new Date(booking.checkOut).toLocaleDateString()}<br />
              Max number of guests: {booking?.numberOfGuests}<br />

              <h3 className="font-semibold text-lg mt-4">Rooms Booked:</h3>
              <ul>
                {booking?.rooms?.map((room, index) => (
                  <li key={index}>
                    Room {room?.roomNumber}
                  </li>
                ))}
              </ul>
            </>
          )}



       
     </div>
     <div>
       

     <div className="mb-5  block   rounded-lg border border-gray-200  shadow-md p-5">
             <h2 className="mb-2 text-lg">Booking Summary</h2>
             <ul>
               <li>
                 <div className="mb-2 flex justify-between">
                   <div>Items</div>
                   <div>${booking?.price}</div>
                 </div>
               </li>{' '}
               <li>
                 <div className="mb-2 flex justify-between">
                 <div>Tax</div>
                  <div>${taxPrice.toFixed(2)}</div>
                 </div>
               </li>
               
              
               <li>
                 <div className="mb-2 flex justify-between">
                 <div>Total</div>
                  <div>${totalPrice.toFixed(2)}</div>
                 </div>
               </li>
               </ul>

                 <button
 
     className=' bg-yellow-400 hover:bg-yellow-600 text-white block w-full py-2 rounded mt-2 '
     onClick={handleCheckout}
   >
     Pay
   </button>
               



     </div>
   </div>
   
 </div>
  </div>


); 



  
  
}

export default Booking