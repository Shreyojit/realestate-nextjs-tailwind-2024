"use client"

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/userSlice';


export default function page() {
  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error } = useSelector((state) => state.user);


    const router = useRouter()

    const dispatch = useDispatch();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        dispatch(signInStart());
        const response = await signIn("credentials", {
          
          email,
          password,
          redirect: false,
        });
        console.log(response)
        
      

      
        

        if (response.success === false) {
          dispatch(signInFailure(response.message));
          return;
        }
        dispatch(signInSuccess(response.data));

        router.push("/")
      } catch (error) {
        console.log(error);
        dispatch(signInFailure(error.message));
      }
    };





    return (
        <div className='p-3 max-w-lg mx-auto'>
          <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='email'
              placeholder='email'
              className='border p-3 rounded-lg'
              id='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='password'
              className='border p-3 rounded-lg'
              id='password'
             
              onChange={(e) => setPassword(e.target.value)} 
            />
    
            <button
              disabled={loading}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Loading...' : 'Sign In'}
              
            </button>
            {/* <OAuth/> */}
          </form>
          <div className='flex gap-2 mt-5'>
            <p>Dont have an account?</p>
            <Link href='/register'>
              <span className='text-blue-700'>Sign up</span>
            </Link>
          </div>
          {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
      );
}
