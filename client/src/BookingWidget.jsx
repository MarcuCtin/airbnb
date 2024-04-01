import React from 'react'
import { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext, UserContextProvider } from './UserContext'
import { differenceInBusinessDays, differenceInCalendarDays } from 'date-fns';
const BookingWidget = ({ place }) => {
    const [checkin,setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setphone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);
    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])
    let numberOfDays = 0;
    if (checkin && checkout) {
        numberOfDays = differenceInCalendarDays(new Date(checkout), new Date(checkin))
    }
    async function BookPlace(){
        const data = {
            place:place._id,
            price:numberOfDays*place.price,
            checkin, checkout, numberOfGuests, name, phone};
        const response = await axios.post('/bookings',data)
        const bookingId = response.data._id;  
        setRedirect(`/account/bookings/${bookingId}`) 
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return (
        <div>
            <div className='bg-white-300 shadow p-4 rounded-2xl'>
                <div className="text-center text-xl py-2">
                    Price:{place.price} / per night
                </div>

                <div className="border rounded-2xl">
                    <div className="flex justify-around">
                        <div className=' py-3 px-4'>
                            <label htmlFor="">Check in:<br /></label>
                            <input type="date" value={checkin} onChange={ev => setCheckin(ev.target.value)} />
                        </div>
                        <div className=' py-3 px-4 border-l'>
                            <label htmlFor="">Check out <br /></label>
                            <input type="date" value={checkout} onChange={ev => setCheckout(ev.target.value)} />
                        </div>

                    </div>
                    <div className=' py-3 px-4 border-t'>
                        <label htmlFor="">Number of guests </label>
                        <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                    </div>
                    {numberOfDays > 0 && (
                        <div className=' py-3 px-4 border-t'>
                            <label htmlFor="">Your full name </label>
                            <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                        
                            <label htmlFor="">Your phone </label>
                            <input type="tel" value={phone} onChange={ev => setphone(ev.target.value)} />
                        
                        </div>
                    )}
                </div>
                <button onClick={BookPlace} className='primary mt-2'>
                    Book this place
                    {numberOfDays > 0 && (
                        <span> for {numberOfDays}  days</span>
                    )}
                </button>
            </div>
        </div>
    )
}

export default BookingWidget