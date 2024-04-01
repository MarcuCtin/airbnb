import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext';
const LoginPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLogin(e){
        e.preventDefault();
        try{
        const {data} = await axios.post('/login',{email,password})
        setUser(data);
        console.log(data)
        alert('login sucesful');
        setRedirect(true);
        }
        catch(e){
            alert('login failed')
        }
    }
    if(redirect){
        return <Navigate to= {'/'}/>
    }
    
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form onSubmit={handleLogin} action="" className='max-w-md mx-auto'>
                    <input value ={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder={'your@emil.com'} />
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="" placeholder={"password"} id="" />
                    <button className='login primary'>login</button>
                    <div className='text-center w-full'>Register   
                        <Link to ={'/register'} className='font-medium underline'>here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage