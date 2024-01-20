"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from './redux/userSlice';
import Header from '@/components/Header';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Link from 'next/link';
import ListingItem from '@/components/ListingItem';



export default function page() {
  const  {data}  = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(signInSuccess(data.user)); // Assuming user details are in data.user
    }
  }, [data, dispatch]);


  const {currentUser}  = useSelector((state) => state.user);

  const [estates, setEstates] = useState([])
  const [isLoading, setIsLoading] = useState(false)

   
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  




     

  useEffect(() => {
    const fetchEstates = async () => {
        try {
            setIsLoading(true)
            const res = await fetch("http://localhost:3000/api/property")
            const data = await res.json()

            setEstates(data)


            setOfferListings(data.filter((estate) => estate.offer === true))
            setSaleListings(data.filter((estate) => estate.type === "sale"))
            setRentListings(data.filter((estate) => estate.type === "rent"))
            
            


        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    fetchEstates()
}, [])













  return (
    
   


    <div>

    <Header/>




    {/* top */}
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Find your next <span className='text-slate-500'>perfect</span>
        <br />
        place with ease
      </h1>
      <div className='text-gray-400 text-xs sm:text-sm'>
        Sahand Estate is the best place to find your next perfect place to
        live.
        <br />
        We have a wide range of properties for you to choose from.
      </div>
      <Link
        href={'/search'}
        className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
      >
        Let's get started...
      </Link>
    </div>

    {/* swiper */}
    <Swiper navigation>
      {offerListings &&
        offerListings.length > 0 &&
        offerListings.map((listing) => (
          <SwiperSlide>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
              key={listing._id}
            ></div>
          </SwiperSlide>
        ))}
    </Swiper>

    {/* listing results for offer, sale and rent */}

    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
      {offerListings && offerListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
            <Link className='text-sm text-blue-800 hover:underline' href={'/search?offer=true'}>Show more offers</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {offerListings?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
      {rentListings && rentListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
            <Link className='text-sm text-blue-800 hover:underline' href={'/search?type=rent'}>Show more places for rent</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {rentListings?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
      {saleListings && saleListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
            <Link className='text-sm text-blue-800 hover:underline' href={'/search?type=sale'}>Show more places for sale</Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {saleListings?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  </div>

    
  )
}
