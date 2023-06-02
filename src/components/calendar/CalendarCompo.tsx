import Head from 'next/head'
import Link from 'next/link'
import React, { ReactNode } from 'react'

export default function CalendarCompo({children}:{children: ReactNode}) {
  return (
    <>
      <Head>
        <title>FullCalendar Next.js 13 Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="favicon" href="/favicon.ico" />
      </Head>
      <div className='navbar'>
        <hr></hr>
        <Link prefetch={false} href='/'>Home</Link><hr></hr>
        <Link prefetch={false} href='/calendar'>Calendar</Link><hr></hr>
      </div>
      <div>
        {children}
      </div>
    </>
  )
}
