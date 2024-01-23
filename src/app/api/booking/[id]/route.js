import db from "@/lib/db";
import { authorize, verifyJwtToken } from "@/lib/jwt";
import Booking from "@/models/Booking";
import Listing from "@/models/Listing";


export async function DELETE(req, ctx) {
  try {
    await db.connect();

    const id = ctx.params.id;
    const decodedToken = authorize(req);
    const userId = decodedToken._id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    if (userId !== booking.user) {
      return new Response(
        JSON.stringify({ error: "You can update only your own Listings" }),
        { status: 403 }
      );
    }

    
     // Remove corresponding unavailable dates from the rooms
     for (const room of booking.rooms) {
        // Assuming room.roomNumber is the unique identifier for a room
        const roomNumber = room.roomNumber;
  
        // Find the corresponding listing/room
        const listing = await Listing.findOne({ 'rooms.roomNumber': roomNumber });
  
        if (listing) {
          // Remove the unavailable dates for the specific roomNumber
          listing.rooms.forEach((listingRoom) => {
            if (listingRoom.roomNumber === roomNumber) {
              listingRoom.unavailableDates = listingRoom.unavailableDates.filter(
                (date) => !booking.unavailableDates.includes(date.toISOString())
              );
            }
          });
  
          // Save the updated listing
          await listing.save();
        }
      }
  
      // Remove the booking
      await booking.remove();
  
      return new Response(JSON.stringify({ message: 'Booking deleted successfully' }), { status: 200 });

  } catch (error) {
    console.error('Error updating listing:', error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}




export async function GET(req,ctx) {
    await db.connect()

    const id = ctx.params.id

    console.log(id)

    try {
        const booking = await Booking.findById(id)

        if (!booking) {
            return new Response(JSON.stringify(null), { status: 404 })
          }



           // Fetch the associated Listing using the place ID
    const listing = await Listing.findById(booking.place);

    if (!listing) {
      return new Response(JSON.stringify({ error: "Listing not found" }), { status: 404 });
    }

    const bookingDetails = {
      ...booking.toObject(),
      listingName: listing.name, // Include Listing name in the response
    };


    delete bookingDetails._doc;



        return new Response(JSON.stringify(bookingDetails), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}