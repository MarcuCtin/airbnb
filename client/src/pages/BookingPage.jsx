import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceGallery from '../PlaceGallery';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBookings] = useState(null);
  useEffect(() => {
    axios.get(`/bookings`).then(response => {
      const foundBooking = response.data.find(({ _id }) => _id === id);
      if (foundBooking) {
        setBookings(foundBooking);
        console.log(foundBooking);
      }
    })
  }, [id])
  if (!booking) {
    return;
  }
  console.log(booking);
  return (

    <div className="mt-4 bg-gray-50 -mx-8 px-8 py-4">
      <h1 className='text-2xl'>{booking.place.title}</h1>
      <a className='flex my-2 underline block font-semibold' href={'https://maps.google.com/?q=' + booking.place.address} target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
        {booking.place.address}</a>
      <div className="bg-gray-200 rounded-2xl py-5 px-5 flex mb-2 ">
        <div className='grow'>
          <div className="text-xl font-semibold">Your booking information:</div>
          <div className='opacity-80 font-semibold text-lg mt-3'>
            <div className="flex">
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
        </div>
        <div className='bg-primary rounded-2xl p-8 flex flex-col'>
          <div className='text-lg font-semibold text-white '>Total price:</div>
          <div className='text-3xl font-semibold text-white'>${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />

    </div>
  )
}

export default BookingPage