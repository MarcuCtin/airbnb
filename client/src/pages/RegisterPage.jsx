import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export const RegisterPage = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    async function registerUser(e){
        e.preventDefault();
        await axios.post('/register',{
            name,
            email,
            password
        })
        .then(()=>{
            alert("registration complete, you can log in after")
        }).catch(e=>{
            alert(e.message)
        })
    }
    return (
    <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form action="" onSubmit={registerUser} className='max-w-md mx-auto'>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        placeholder='name' />
                    <input 
                        type="email"
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}
                        placeholder="email" />
                    <input 
                        type="password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        placeholder="password" id="" />

                    <button type="submit" className='login primary'>Register</button>
                    
                    <div className='text-center w-full'>Have an account already?    
                        <Link to ={'/login'} className='font-medium underline'> Login here.</Link>
                    </div>
                </form>
            </div>
        </div>
  )
}
