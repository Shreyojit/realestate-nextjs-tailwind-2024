"use client"

// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { differenceInCalendarDays } from 'date-fns';
// import { useRouter } from "next/navigation";


// const Reserve = ({ setOpen, hotelInfo }) => {
//   const [formData, setFormData] = useState({
//     checkIn: '',
//     checkOut: '',
//     numberOfGuests: 1,
//     name: '',
//     phone: '',
//     selectedRooms: [],
//   });

//   const { data: session } = useSession();
//   const navigate = useRouter();

//   let numberOfNights = 0;
//   if (formData.checkIn && formData.checkOut) {
//     numberOfNights = differenceInCalendarDays(new Date(formData.checkOut), new Date(formData.checkIn));
//   }

//   const handleChange = (name, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (roomId) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       selectedRooms: prevData.selectedRooms.includes(roomId)
//         ? prevData.selectedRooms.filter((id) => id !== roomId)
//         : [...prevData.selectedRooms, roomId], // Convert roomId to number
//     }));
//   };




//   const getDatesInRange = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const date = new Date(start.getTime());

//     const dates = [];

//     while (date <= end) {
//       dates.push(new Date(date).getTime());
//       date.setDate(date.getDate() + 1);
//     }

//     return dates;
//   };

//   const alldates = getDatesInRange(checkIn,checkOut);


//  console.log(alldates)





  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('/api/booking', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${session?.user?.accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             checkIn: formData.checkIn,
//             checkOut: formData.checkOut,
//             name: formData.name,
//             phone: formData.phone,
//             rooms: formData.selectedRooms.map((roomId) => ({ roomNumber: +roomId })), // Convert roomId to number
//             price: numberOfNights * (hotelInfo.regularPrice - hotelInfo.discountPrice),
//             place: hotelInfo._id,
//             user: session?.user?._id,
//           }),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to submit booking: ${res.status}`);
//       }

//       const data = await res.json();
//       navigate.push(`/account/bookings/${data._id}`);
//     } catch (error) {
//       console.error('Error submitting booking:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
//       <div className="bg-white shadow p-4 rounded-2xl relative">
//         <div className="text-2xl text-center">
//           Price: ${hotelInfo.regularPrice - hotelInfo.discountPrice} / per night
//         </div>
//         <div className="flex justify-end mt-[-10px] absolute right-4 top-4">
//           <IoMdCloseCircleOutline
//             size={30}
//             onClick={() => setOpen(false)}
//             className="cursor-pointer"
//           />
//         </div>
//         <div className="border rounded-2xl mt-4">
//           <div className="flex">
//             <div className="py-3 px-4">
//               <label>Check in:</label>
//               <input
//                 type="date"
//                 value={formData.checkIn}
//                 onChange={(ev) => handleChange('checkIn', ev.target.value)}
//               />
//             </div>
//             <div className="py-3 px-4 border-l">
//               <label>Check out:</label>
//               <input
//                 type="date"
//                 value={formData.checkOut}
//                 onChange={(ev) => handleChange('checkOut', ev.target.value)}
//               />
//             </div>
//           </div>
//           <div className="py-3 px-4 border-t">
//             <label>Number of guests:</label>
//             <input
//               type="number"
//               value={formData.numberOfGuests}
//               className="p-3 border border-gray-300 rounded-lg ml-5"
//               onChange={(ev) => handleChange('numberOfGuests', ev.target.value)}
//             />
//           </div>
//           {numberOfNights > 0 && (
//             <div className="py-3 px-4 border-t">
//               <label>Your full name:</label>
//               <input
//                 type="text"
//                 className="p-3 border border-gray-300 rounded w-full"
//                 value={formData.name}
//                 onChange={(ev) => handleChange('name', ev.target.value)}
//               />
//               <label>Phone number:</label>
//               <input
//                 type="tel"
//                 className="p-3 border border-gray-300 rounded w-full"
//                 value={formData.phone}
//                 onChange={(ev) => handleChange('phone', ev.target.value)}
//               />
//             </div>
//           )}
//         </div>
//         <div className="bg-white shadow p-4 rounded-2xl">
//           <div className="flex flex-wrap gap-5 text-xs text-gray-500">
//             {hotelInfo.rooms.map((room) => (
//               <div key={room._id} className="flex flex-col">
//                 <label>{room.roomNumber}</label>
//                 <input
//                   type="checkbox"
//                   value={room._id}
//                 //   checked={formData.selectedRooms.includes(room._id)}
//                 //   onChange={() => handleCheckboxChange(room.roomNumber)}
//                 checked={formData.selectedRooms.includes(room.roomNumber)}
//                 onChange={() => handleCheckboxChange(room.roomNumber)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="bg-red-900 p-2 w-full text-white rounded-2xl mt-4"
//         >
//           Book this place
//           {numberOfNights > 0 && (
//             <span> ${numberOfNights * (hotelInfo.regularPrice - hotelInfo.discountPrice)}</span>
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Reserve;




// Import necessary modules
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { differenceInCalendarDays } from 'date-fns';
import { useRouter } from "next/navigation";

// const getDatesInRange = (startDate, endDate) => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   const date = new Date(start.getTime());
//   const dates = [];

//   while (date <= end) {
//    dates.push((new Date(date).toISOString()).substring(0, 10));

// console.log(dates); // Outputs '2024-01-01'
//     date.setDate(date.getDate() + 1);
//   }

//   return dates;
// };

const Reserve = ({ setOpen, hotelInfo }) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
   
    name: '',
    phone: '',
    numberOfGuests: 1,
    selectedRooms: [],
  });



  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const date = new Date(start.getTime());
    const dates = [];
  
    while (date < end) {
     dates.push(new Date(date).toISOString());
  
  
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  };





  const { data: session } = useSession();
  const navigate = useRouter();

  let numberOfNights = 0;
  if (formData.checkIn && formData.checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(formData.checkOut), new Date(formData.checkIn));
  }

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (roomId) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedRooms: prevData.selectedRooms.includes(roomId)
        ? prevData.selectedRooms.filter((id) => id !== roomId)
        : [...prevData.selectedRooms, roomId], // Convert roomId to number
    }));
  };


  const isAvailable = (room) => {
    const alldates = getDatesInRange(formData.checkIn, formData.checkOut);
  
    console.log(alldates)
    console.log(room?.unavaiableDates)
    const isFound = room?.unavailableDates?.some((date) =>
      alldates.includes(date)
    );
    console.log(isFound)
  
    return !isFound;
  };
  
  
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          name: formData.name,
          phone: formData.phone,
          numberOfGuests: formData.numberOfGuests,
          rooms: formData.selectedRooms.map((roomId) => ({
            roomNumber: +roomId, // Convert roomId to number
            unavailableDates: getDatesInRange(formData.checkIn, formData.checkOut),
          })),
          price: numberOfNights * (hotelInfo.regularPrice - hotelInfo.discountPrice),
          place: hotelInfo._id,
          user: session?.user?._id,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit booking: ${res.status}`);
      }

      const data = await res.json();
      navigate.push(`/account/bookings/${data._id}`);
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <div className="bg-white shadow p-4 rounded-2xl relative">
        <div className="text-2xl text-center">
          Price: ${hotelInfo.regularPrice - hotelInfo.discountPrice} / per night
        </div>
        <div className="flex justify-end mt-[-10px] absolute right-4 top-4">
          <IoMdCloseCircleOutline
            size={30}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check in:</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(ev) => handleChange('checkIn', ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check out:</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(ev) => handleChange('checkOut', ev.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input
              type="number"
              value={formData.numberOfGuests}
              className="p-3 border border-gray-300 rounded-lg ml-5"
              onChange={(ev) => handleChange('numberOfGuests', ev.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name:</label>
              <input
                type="text"
                className="p-3 border border-gray-300 rounded w-full"
                value={formData.name}
                onChange={(ev) => handleChange('name', ev.target.value)}
              />
              <label>Phone number:</label>
              <input
                type="tel"
                className="p-3 border border-gray-300 rounded w-full"
                value={formData.phone}
                onChange={(ev) => handleChange('phone', ev.target.value)}
              />
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
                  checked={formData.selectedRooms.includes(room.roomNumber)}
                  onChange={() => handleCheckboxChange(room.roomNumber)}
                  disabled={!isAvailable(room)}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-900 p-2 w-full text-white rounded-2xl mt-4"
        >
          Book this place
          {numberOfNights > 0 && (
            <span> ${numberOfNights * (hotelInfo.regularPrice - hotelInfo.discountPrice)}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default Reserve;
