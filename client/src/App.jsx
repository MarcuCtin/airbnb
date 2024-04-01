
import './App.css'
import { Routes,Route } from 'react-router-dom'
import IndexPage from './pages/indexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import { RegisterPage } from './pages/RegisterPage'
import axios from 'axios'
import { UserContext, UserContextProvider } from './UserContext'
import { useEffect } from 'react'
import Account from './pages/ProfilePage'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import BookingPage from './pages/BookingPage'
import BookingsPage from './pages/BookingsPage'
import PlacesFormPage from './pages/PlacesFormPage'
axios.defaults.baseURL = 'http://localhost:8080'
import PlacePage from './pages/PlacePage'
axios.defaults.withCredentials = true;
function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path ="/" element={<Layout/>}>
          <Route index element ={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/account' element={<ProfilePage/>}/>
          <Route path='/account/places' element={<PlacesPage/>}/>
          <Route path='/account/places/new' element={<PlacesFormPage/>}/>
          <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
          <Route path='/place/:id' element={<PlacePage/>}/>
          <Route path='/account/bookings/' element={<BookingsPage/>}/>
          <Route path='/account/bookings/:id' element={<BookingPage/>}/>
        </Route>
      </Routes>
   </UserContextProvider>
  )
}

export default App
