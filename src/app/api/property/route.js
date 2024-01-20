// api/property.js
import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Listing from "@/models/Listing";


export async function GET(req) {
  await db.connect()

  try {
      const properties = await Listing.find({}).limit(16).populate("userRef")

      return new Response(JSON.stringify(properties), { status: 200 })
  } catch (error) {
      return new Response(JSON.stringify(null), { status: 500 })
  }
}



export async function POST(req) {
  try {
    await db.connect();


    const accessToken = req.headers.get("authorization")
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }


    const body = await req.json()


  

    const newProperty = await Listing.create(body)

    console.log(newProperty)


    









    return new Response(JSON.stringify(newProperty), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }

}


// export { handler as GET, handler as POST };
