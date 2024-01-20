import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import Listing from "@/models/Listing";

import bcrypt from 'bcrypt'

export async function GET(req, ctx) {
    try {
        await db.connect()

        const id = ctx.params.id

        console.log(id)


        const listings = await Listing.find({ userRef: id });

        
         console.log(listings)

        return new Response(JSON.stringify(listings), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}