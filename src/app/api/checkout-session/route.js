// Import necessary dependencies
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Initialize Stripe with your secret key

// Define the handler function for POST requests
 export async function POST(req) {
  try {
    const {item}  = req.body;

    console.log(item);
   


    const redirectURL = 'http://localhost:3000';

    const transformedItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          images: [item.image],
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      description: item.description,
      quantity: item.quantity,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [transformedItem],
      mode: 'payment',
      success_url: 'http://localhost:3000?status=success',
      cancel_url:  'http://localhost:3000?status=cancel',
      metadata: {
        images: item.image,
      },
    });
    
console.log(session)


    // Return success response with session ID
    return new Response(JSON.stringify({ id: session.id }), { status: 201 });
  } catch (error) {
    // Return error response with status code 500
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

// export { handler as POST };