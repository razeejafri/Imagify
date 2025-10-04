import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {  useNavigate } from 'react-router'
import { delay, motion } from "motion/react"
import { AppContext } from '../context/AppContext'

export default function Generatebtn() {

  const { user,setshowLogin }=useContext(AppContext)
  const navigate = useNavigate()
  
  const onClickHandler = () => {
    if(user) {
      navigate('/result')
    } else { 
      setshowLogin(true)
    }
  }

  return (
    <motion.div
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true}}
    className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-5xl mt-4 
        font-semibold text-neutral-800 py-6 md:py-16'>See the magic.Try now</h1>

        <motion.button 
        whileHover={{ scale : 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0}}
        transition={{ opacity: { delay:0.8, duration: 1 }, default: { duration: 0.5 } }}
        animate={{ opacity: 1}}
        onClick={onClickHandler} className='inline-flex 
        items-center gap-2 px-12 py-3 rounded-full bg-black text-white 
        m-auto hover:scale-105 transition-all duration-500 divide-gray-500'>
           Generate Images
            <img src={assets.star_group} alt='' className='h-6'/>
        </motion.button>
    </motion.div>
  )
}