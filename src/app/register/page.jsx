"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
        const res = await fetch('http://localhost:3000/api/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: name, email: email, password: password })
        })
        if (res?.error == null) {
            
            const data = await res.json()
            console.log(data)

            if (data.success === false) {
              setLoading(false);
              setError(data.message);
              return;
            }
            setLoading(false);
            setError(null);

            setTimeout(() => {
                router.push("/login")
            }, 1000)
        } else {
            console.log("error")
        }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='name'
          className='border p-3 rounded-lg'
          id='name'
          onChange={(e) => setName(e.target.value)} 
        />
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
          {loading ? 'Loading...' : 'Sign Up'}
         
        </button>
        {/* <OAuth/> */}
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link  href='/sign-in'>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
  };