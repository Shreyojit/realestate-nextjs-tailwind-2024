import db from "@/lib/db";
import { authorize } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from 'bcrypt'

export async function GET(req, ctx) {
    try {
        await db.connect()

        const id = ctx.params.id

        const user = await User.findById(id)

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}

export async function PUT(req, ctx) {
    try {
        await db.connect();

        const id = ctx.params.id;
        const decodedToken = authorize(req);
        const userId = decodedToken._id;

        const body = await req.json();

        if (userId !== id) {
            return new Response(
                JSON.stringify({ error: "You can update only your own profile" })
            );
        }

        // Check if a password is provided in the request body
        if (body.password) {
            // Hash the password before updating
            const hashedPassword = await bcrypt.hash(body.password, 10);
            body.password = hashedPassword;
        }

        // Use { new: true } to return the modified document
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { ...body } },
            { new: true }
        );

        // Omit the password from the response
        const { password, ...rest } = updatedUser._doc;

        return new Response(JSON.stringify(rest), { status: 201 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "An error occurred" }),
            { status: 500 }
        );
    }
}