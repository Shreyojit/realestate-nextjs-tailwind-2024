import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Booking from "@/models/Booking";

export async function handler(req, res, next) {
  try {
    await db.connect();

   
    const accessToken = req.headers.get("authorization")
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }


    const body = await req.json()


  

    const newBooking = await Booking.create(body)

    console.log(newBooking)


    









    return new Response(JSON.stringify(newBooking), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }

}



export { handler as POST };
