import db from "@/lib/db";
import { authorize, verifyJwtToken } from "@/lib/jwt";
import Listing from "@/models/Listing";


export async function GET(req,ctx) {
    await db.connect()

    const id = ctx.params.id

    console.log(id)

    try {
        const property = await Listing.findById(id)

        if (!property) {
            return new Response(JSON.stringify(null), { status: 404 })
          }

        return new Response(JSON.stringify(property), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}


export async function PUT(req,ctx) {
 
    await db.connect()

    const id = ctx.params.id;
    const decodedToken = authorize(req);
    const userId = decodedToken._id;

    console.log(id)
    const listing = await Listing.findById(id);

    console.log(listing)

    const body = await req.json();

   



    if (userId !== listing.userRef) {
        return new Response(
            JSON.stringify({ error: "You can update only your own Listings" })
        );
    }


   try{
    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        { $set: { ...body } },
        { new: true }
    );
   

    return new Response(JSON.stringify(updatedListing), { status: 201 });

   } 
   catch (error) {
    return new Response(JSON.stringify(null), { status: 500 })
}





}