import db from '@/lib/db';
import Listing from '@/models/Listing'; // Adjust the path based on your project structure


export async function GET(req) {

  db.connect()

  try {


    const {searchParams} = new URL(req.url)
    console.log(req.url)
    
    const query = searchParams.get('searchTerm')
    console.log(query)
   
    const limit = parseInt(searchParams.get('limit')) || 9;
    const startIndex = parseInt(searchParams.get('startIndex')) || 0;
    let offer = searchParams.get('offer');

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = searchParams.get('furnished');

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = searchParams.get('parking');

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = searchParams.get('type');

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = searchParams.get('searchTerm')|| '';

    const sort = searchParams.get('sort')|| 'createdAt';

    const order = searchParams.get('order') || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
