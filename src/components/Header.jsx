import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import { Menu } from '@headlessui/react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser)

  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); // Use useRouter hook

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(router.asPath); // Use router.asPath to get the current URL
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath); // Use router.asPath to get the current URL
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [router.asPath]); // Update when the URL changes

  return (
   
   

    <header className='bg-slate-200 items-center shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link href='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link href='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link href='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          {/* <Link href='/profile'> */}
            {currentUser ? (
              <>
                {/* <li  className='relative flex items-center space-x-2 -mt-1 -mr-4'
                 onClick={toggleDropdown}
                >
                  Use the Image component directly
                  <img
                    width='45' height='45'
                    className='rounded-full h-7 w-7 object-cover cursor-pointer'
                    src={currentUser?.avatar}
                    alt='profile'
                  />
                  <span
                    className='text-slate-700 cursor-pointer'
                   
                  >
                    {currentUser?.name}
                  </span>
                </li> */}

                {/* {dropdownOpen && (
                  <div className='absolute top-0 right-14 mt-12 bg-slate-300 border border-gray-200 rounded-md shadow-lg w-30'>
                    <ul>
                      <li
                        className='py-2 px-8 cursor-pointer hover:bg-gray-100'
                        onClick={() => router.push('/profile')}
                      >
                        My Profile
                      </li>
                      <li
                        className='py-2 px-8 cursor-pointer hover:bg-gray-100'
                        onClick={() => router.push('/my-bookings')}
                      >
                        My Bookings
                      </li>
                      <li
                        className='py-2 px-8 cursor-pointer hover:bg-gray-100'
                        onClick={() => router.push('/my-listings')}
                      >
                        My Listings
                      </li>
                      <li
                        className='py-2 px-8 cursor-pointer hover:bg-gray-100'
                        onClick={() => router.push('/favourites')}
                      >
                        Favorites
                      </li>
                      <li
                        className='py-2 px-8 cursor-pointer hover:bg-gray-100'
                        onClick={() => router.push('/payments')}
                      >
                        Payments
                      </li>
                      <li
                        className='py-2 px-8 cursor-pointer hover:bg-gray-100'
                        onClick={() => signOut()}
                      >
                        Logout
                      </li>
                      <li
                        className='py-2 px-8 cursor-pointer hover:bg-gray-100'
                        onClick={() => router.push('/createListing')}
                      >
                        Create-Listing
                      </li>
                    </ul>
                  </div>
                )} */}






  <Menu as="div" className="relative inline-block">

<Menu.Button className="text-blue-600">
                    
<li  className='relative flex items-center space-x-2 -mt-1 -mr-4'
              
                >
                  
                  <img
                    width='45' height='45'
                    className='rounded-full h-7 w-7 object-cover cursor-pointer'
                    src={currentUser?.avatar}
                    alt='profile'
                  />
                  <span
                    className='text-slate-700 cursor-pointer'
                   
                  >
                    {currentUser?.name}
                  </span>
                </li>




                  </Menu.Button>

      <Menu.Items className="absolute -right-20 w-40 origin-top-right bg-white  shadow-lg ">
      <Menu.Item>
        {({ active }) => (
          <li
            className={`py-2 px-8 cursor-pointer ${
              active ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => router.push(`/profile/${currentUser?._id}`)}
          >
            My Profile
          </li>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <li
            className={`py-2 px-8 cursor-pointer ${
              active ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => router.push('/my-bookings')}
          >
            My Bookings
          </li>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <li
            className={`py-2 px-8 cursor-pointer ${
              active ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => router.push('/my-listings')}
          >
            My Accomodations
          </li>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <li
            className={`py-2 px-8 cursor-pointer ${
              active ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => router.push('/favourites')}
          >
            Favorites
          </li>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <li
            className={`py-2 px-8 cursor-pointer ${
              active ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => router.push('/payments')}
          >
            Payments
          </li>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <li
            className={`py-2 px-8 cursor-pointer ${
              active ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => signOut()}
          >
            Logout
          </li>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <li
            className={`py-2 px-8 cursor-pointer ${
              active ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => router.push('/createListing')}
          >
            Create-Listing
          </li>
        )}
      </Menu.Item>
    </Menu.Items>
  </Menu>










              </>
            ) : (
              <li className='text-slate-700 hover:underline'>Sign in</li>
            )}
          {/* </Link> */}
        </ul>
      </div>
    </header>

   
  );
}
