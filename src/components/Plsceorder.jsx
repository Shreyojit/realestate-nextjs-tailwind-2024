import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';




export default function Placeorder(ctx) {
 


  const { data: session } = useSession();

 
  

  const handleCheckout = async () => {
    
    // // move to stripe checkoutpage
    // try {
    //   const { data } = await axios.post(
    //     `/api/checkout`,
    //     {
    //       orderId: orderId,
    //       items: orderItems,
    //       shippingAddress,
    //       isPaid
    //     }
    //   );


    //   console.log(data);
      

    //   window.location.href = data.url;
    // } catch (error) {
    //   console.log(error.response);
    // }
  };
  
   

  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/booking/${id}`);
        const data = await response.json();

        if (!response.ok) {
          console.error('Error fetching booking details:', data.error);
        } else {
          setBooking(data);
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    if (id) {
      fetchBookingDetails();
    }
  }, [id]);
  






  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
     <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
  
    <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
      <div>
        <div className="my-4">
          <h2 className="font-semibold text-2xl">Description</h2>
          {place.description}
        </div>
        Check-in: {place.checkIn}<br />
        Check-out: {place.checkOut}<br />
        Max number of guests: {place.maxGuests}
      </div>
      <div>
        

      <div className="mb-5  block   rounded-lg border border-gray-200  shadow-md p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>{' '}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                </ul>

                  <button
  
      className=' bg-yellow-400 hover:bg-yellow-600 text-white block w-full py-2 rounded mt-2 '
      onClick={handleCheckout}
    >
      Pay
    </button>
                



      </div>
    </div>
    
  </div>
  </div>


);

    
  }
                  





