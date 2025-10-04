import React, { useContext } from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import {Route,Routes} from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Error from './pages/Error'

function App() {

const {user, showLogin} = useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 
    min-h-screen bg-gradient-to-b from-teal-50
    to-orange-100'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      
      {showLogin && <Login/>}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Result' element={user ? <Result/> : <Home/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>

        <Route path='*' element={<Error/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App