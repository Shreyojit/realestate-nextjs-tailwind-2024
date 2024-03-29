'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const ClientProtectPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/protected/client')
    }
  })
}