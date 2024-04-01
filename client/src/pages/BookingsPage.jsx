import React from 'react'
import AccountNav from '../AccountNav'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PlaceImg from '../PlaceImg'
import { Link } from 'react-router-dom'
import { format, differenceInCalendarDays } from 'date-fns'
const BookingsPage = () => {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <h1>Bookings</h1>
            <div>
                {bookings?.length > 0 && bookings.map(booking => {
                    return (
                        <Link to={`/account/bookings/${booking._id}`}>
                            <div key={booking._id} className='mb-3 overflow-hidden flex gap-4 rounded-2xl mx-2 bg-gray-100'>
                            <div className='w-48 h-48 flex relative'>
                                <PlaceImg place={booking.place} />
                            </div>
                            <div className='px-3 grow pr-3 pt-4'>
                                <h2 className='text-2xl'>{booking.place.title}</h2>

                                <div className='opacity-60 text-lg '>
                                    <div className="flex mt-12">
                                        <span className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                            </svg>
                                            &nbsp;
                                            {differenceInCalendarDays(new Date(booking.checkout), new Date(booking.checkin))} Nights: &nbsp;
                                        </span>
                                        <div className="gap-1 flex">
                                        <div className="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg> &nbsp;

                                            {format(new Date(booking.checkin), 'yyyy-MM-dd')}
                                        </div>
                                        &rarr;
                                        <div className="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-0.5 w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg> &nbsp;

                                            {format(new Date(booking.checkin), 'yyyy-MM-dd')}

                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='gap-1 flex mt-1 text-2xl font-semibold'>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mt-0.4 w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
</svg>
Total Price : ${booking.price}

                                    
                                </div>
                            </div>
                        </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default BookingsPage