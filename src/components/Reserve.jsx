'use client'

import { differenceInCalendarDays } from 'date-fns';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { IoIosCloseCircle, IoMdCloseCircleOutline } from "react-icons/io";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';


const Reserve = ({ setOpen, hotelInfo ,userId}) => {

    console.log(userId)

    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    
    const { data: session, status } = useSession()
    
  
  console.log(typeof numberOfGuests)

   const navigate = useRouter()

    let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  

  async function bookThisPlace() {
  
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.user?.accessToken}`,
      },
      body : JSON.stringify({
        
        checkIn,checkOut,name,phone,
        price:numberOfNights * (hotelInfo.regularPrice-hotelInfo.discountPrice),
         place:hotelInfo._id,
         user: session?.user?._id,
      }),
    })
    console.log(res)
    const data = await res.json();
    console.log(data)
    navigate.push(`/account/bookings/${data._id}`);
    }

   
  

  




  return (
    

    <div className="bg-white shadow p-4 rounded-2xl relative">
    <div className="text-2xl text-center">
      Price: ${hotelInfo.regularPrice-hotelInfo.discountPrice
} / per night
    </div>
    <div className="flex justify-end mt-[-10px] absolute right-4 top-4">
        <IoMdCloseCircleOutline
          size={30} // Set the desired size
          onClick={() => setOpen(false)}
          className="cursor-pointer"
        />
      </div>
    <div className="border rounded-2xl mt-4">
      <div className="flex">
        <div className="py-3 px-4">
          <label>Check in:</label>
          <input type="date"
                 value={checkIn}
                 onChange={ev => setCheckIn(ev.target.value)}/>
        </div>
        <div className="py-3 px-4 border-l">
          <label>Check out:</label>
          <input type="date" value={checkOut}
                 onChange={ev => setCheckOut(ev.target.value)}/>
        </div>
      </div>
      <div className="py-3 px-4 border-t">
        <label>Number of guests  :</label>
        <input type="number"
               value={numberOfGuests}
               className='p-3 border border-gray-300 rounded-lg ml-5'
               onChange={ev => setNumberOfGuests(ev.target.value)}/>
      </div>
      {numberOfNights > 0 && (
        <div className="py-3 px-4 border-t">
          <label>Your full name:</label>
          <input type="text"
           className='p-3 border border-gray-300 rounded w-full'
                 value={name}
                 onChange={ev => setName(ev.target.value)}/>
          <label>Phone number:</label>
          <input type="tel"
           className='p-3 border border-gray-300 rounded w-full'
                 value={phone}
                 onChange={ev => setPhone(ev.target.value)}/>
        </div>
      )}

    






    </div>



    <div className="bg-white shadow p-4 rounded-2xl">
  <div className="flex flex-wrap gap-5 text-xs text-gray-500">
    {hotelInfo.rooms.map((room) => (
      <div key={room._id} className="flex flex-col">
        <label>{room.roomNumber}</label>
        <input
          type="checkbox"
          value={room._id}
          // onChange={handleSelect}
          // disabled={!isAvailable(room)}
        />
      </div>
    ))}
  </div>
</div>

      

<button onClick={bookThisPlace} className="bg-red-900 p-2 w-full text-white rounded-2xl mt-4">
      Book this place
      {numberOfNights > 0 && (
        <span> ${numberOfNights * (hotelInfo.regularPrice-hotelInfo.discountPrice)}</span>
      )}
    </button>
  </div>



  )
}

export default Reserve