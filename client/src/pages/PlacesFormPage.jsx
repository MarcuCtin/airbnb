import React, { useEffect } from 'react'
import { useState } from 'react';
import Perks from './Perks';
import PhotoUploader from '../PhotoUploader';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';
const PlacesFormPage = () => {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extra,setExtra] = useState('');
    const [checkin,setCheckin] = useState('');
    const [checkout,setCheckout] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect,setRedirect] = useState(false)
    useEffect(()=>{
      if(!id){
        return
      }
      axios.get('/places/'+id)
      .then(response=>{
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.addedPhotos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtra(data.extra);
        setCheckin(data.checkin);
        setCheckout(data.checkout);
        setMaxGuests(data.maxGuests)
        setPrice(data.price)
      })
    },[id])
    function inputHeader(text){
        return (
          <h2 className='text-2xl mt-4'>{text}</h2>
        )
      }
      function inputDescription(text){
        return (
          <p className='text-gray-500 text-sm'>{text}</p>
          )
      }
      function preInput(header,description){
        return (
          <>
          {inputHeader(header)}
          {inputDescription(header)}
          </>    
    )
      }
      async function savePlace(ev){
        ev.preventDefault();
        const placeData ={
          title,
          address,
          price,
          addedPhotos,
          description,
          perks,
          extra,
          checkin,
          checkout,
          maxGuests
        }
        if(id){
          //update
          await axios.put('/places',{
            id,
            ...placeData
          })
          setRedirect(true)
        }else{
        
        await axios.post('/places',placeData)
        setRedirect(true)
      }}
      if(redirect){
        return <Navigate to={'/account/places'}/>
      }
  return (
    <div>
        <AccountNav/>
            <form action="" onSubmit={savePlace}>
              {preInput('Title','Title for your place')}

              <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder='title' />
              {preInput('address','Address to your place')}
              <input type="text" value={address} onChange={e =>setAddress(e.target.value)} placeholder='address' />
              {preInput('Photos','more=better')}
              <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
              {preInput('Description','description of the place')}
              <textarea value={description} onChange={e=>setDescription(e.target.value)}/>
              {preInput('Perks','selecte the perks of loc')}
              <div className='grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                <Perks selected={perks} onChange={setPerks}/>
              </div>
              {preInput("Extras","extra info")}
              <textarea value={extra} onChange={e=>setExtra(e.target.value)}/>
              {preInput('check in out','check in out')}
              <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                <div>
                  <h3 className='mt-2 -mb-1'>Check in time</h3>
                  <input type="text" value={checkin}
                   onChange={e=>setCheckin(e.target.value)} placeholder='14:00'/>
                  </div>
                <div>
                <h3 className='mt-2 -mb-1'>Check out time</h3>
                  <input value={checkout}
                   onChange={e=>setCheckout(e.target.value)} type="text" placeholder='11'/>
                </div>
                <div>
                <h3 className='mt-2 -mb-1'>Max number of guests</h3>

                  <input type="number" value={maxGuests}
                   onChange={e=>setMaxGuests(e.target.value)} />
                </div>
                <div>
                <h3 className='mt-2 -mb-1'>Price per night</h3>

                  <input type="number" value={price}
                   onChange={e=>setPrice(e.target.value)} />
                </div>

              </div>
              <div>
                <button className='my-4 primary'>Save</button>
              </div>
            </form>
          </div>
  )
}

export default PlacesFormPage