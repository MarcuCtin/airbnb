import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios';
import AccountNav from '../AccountNav';
import PlaceImg from '../PlaceImg';
const PlacesPage = () => {
  const [places,setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/places')
        .then(({data})=>{
          setPlaces(data);
        })
  },[])
  return (
    <div className="">
      <AccountNav/>
        <div className="text-center">
          <Link className="inline-flex text-center gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            <span>Add a new place</span>
          </Link>
        </div>
        <div>
          {
            places.length>0 && places.map(place=>(
              <Link to={place._id}className='bg-gray-100 flex cursor-pointer p-4 gap-4 rounded-2xl'>
                <div className='w-32 h-32 flex bg-gray-300'>
                  <PlaceImg place={place}/>
                </div>
                <div className='grow-0 shrink'>
                <h2 className='text-xl '>{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
                
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export default PlacesPage