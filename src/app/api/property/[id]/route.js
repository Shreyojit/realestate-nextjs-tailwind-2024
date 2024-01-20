import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Listing from "@/models/Listing";


export async function handler(req,ctx) {
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

export { handler as GET };