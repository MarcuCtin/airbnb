import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PlaceGallery from '../PlaceGallery'
import BookingWidget from '../BookingWidget'
const PlacePage = () => {
    const { id } = useParams()
    const [place, setPlace] = useState({})
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data)

        })
    }, [id])
    if(!place) return;
    return (
        <div className="mt-4 bg-gray-50 -mx-8 px-8 py-4">
            <h1 className='text-2xl'>{place.title}</h1>
            <a className='flex my-2 underline block font-semibold' href={'https://maps.google.com/?q=' + place.address} target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
{place.address}</a>
            <PlaceGallery place={place}/>
           
            <div className='mt-8 px-2 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                <div>
                <h2 className='font-semibold text-3xl'>Description</h2>
                <p>{place.description}</p>
            </div>
                    Check-in :{place.checkin}
                    <br />
                    Checkout : {place.checkout}
                    <br />
                    Max Guests : {place.maxguests}
                
                </div>
                <div>
                    <BookingWidget place ={place}/>
                </div>
            </div>
            <div className="bg-white">
                <h2 className='font-semibold text-2xl'>Extra info</h2>
                <div>{place.extra}</div>
            </div>
        </div>
    )
}

export default PlacePage