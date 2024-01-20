"use client"


import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux';


import { persistor, store } from './redux/store';

import Providing from '@/SessionProvider';
import Header from '@/components/Header';

// import { PersistGate } from 'redux-persist/integration/react'

// import SessionProvider from './SessionProvider'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children,session }) {
  return (

    <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}

    
   <Providing>

   
    
    <html lang="en">
    <body className={inter.className}>
           
           {/* <Header> */}


           {children}

           {/* </Header> */}
    
         
            
            
    </body>
  </html>
  
       
        </Providing>
        {/* </PersistGate> */}
        </Provider>
  )
}
