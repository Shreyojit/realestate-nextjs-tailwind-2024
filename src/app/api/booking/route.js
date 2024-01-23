// import db from '@/lib/db';
// import { verifyJwtToken } from '@/lib/jwt';
// import Booking from '@/models/Booking';
// import Listing from '@/models/Listing';

// export async function POST(req) {
//   try {
//     await db.connect();

//     // if (req.method !== 'POST') {
//     //   return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
//     // }

//     const accessToken = req.headers.get('authorization');
//     const token = accessToken.split(' ')[1];

//     const decodedToken = verifyJwtToken(token);

//     if (!accessToken || !decodedToken) {
//       return new Response(JSON.stringify({ error: 'Unauthorized (wrong or expired token)' }), { status: 403 });
//     }

//     const body = await req.json();

//     const newBooking = await Booking.create(body);


//     //  const listing = await Listing.findOne({ _id: body.place });

//      // Find the corresponding Listing based on the place field in the booking
//     const listingId = body.place;

//     console.log(listingId)

//     // Update the rooms of the Listing
//     for (const room of body.rooms) {
//       await Listing.findByIdAndUpdate(
//         { _id: listingId, 'rooms.roomNumber': room.roomNumber },
//         {
//           $set: {
//             'rooms.$.unavailableDates': room.unavailableDates,
//           },
//         }
//       );
//     }
 





//     console.log(newBooking);

//     return new Response(JSON.stringify(newBooking), { status: 201 });
//   } catch (error) {
//     console.error('Error handling booking request:', error);
//     return new Response(JSON.stringify(null), { status: 500 });
//   }
// }

// // export { handler as POST };




import db from '@/lib/db';
import { verifyJwtToken } from '@/lib/jwt';
import Booking from '@/models/Booking';
import Listing from '@/models/Listing';

export async function POST(req) {
  try {
    await db.connect();

    const accessToken = req.headers.get('authorization');
    const token = accessToken.split(' ')[1];

    const decodedToken = verifyJwtToken(token);

    if (!accessToken || !decodedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized (wrong or expired token)' }), { status: 403 });
    }

    const body = await req.json();

    const newBooking = await Booking.create(body);

    // Find the corresponding Listing based on the place field in the booking
    const listingId = body.place;

    // Update the rooms of the Listing
    for (const room of body.rooms) {
      await Listing.findOneAndUpdate(
        { _id: listingId, 'rooms.roomNumber': room.roomNumber },
        {
          $set: {
            'rooms.$.unavailableDates': room.unavailableDates,
          },
        }
      );
    }

    console.log(newBooking);

    return new Response(JSON.stringify(newBooking), { status: 201 });
  } catch (error) {
    console.error('Error handling booking request:', error);
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
