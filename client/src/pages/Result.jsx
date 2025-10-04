import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { delay, motion } from "motion/react"

function Result() {

  const [image,setimage]=useState(assets.sample_img_1)
  const [isImageLoaded,setisImagesisLoaded]=useState(false)
  const [loading,setloading]=useState(false)
  const [input,setinput]=useState('')

  const {generateImage}=useContext(AppContext)

  const onsubmitHandler=async (e)=>{
      e.preventDefault()
      setloading(true)

      if(input)
      {
        const image=await generateImage(input)
        if(image)
        {
          setisImagesisLoaded(true)
          setimage(image)
        }
      }
      setloading(false)
  }

  return (
    <motion.form
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true}}
    onSubmit={onsubmitHandler} className='flex flex-col min-h-[90vh] 
    justify-center items-center'>
    <div>
      <div className='relative'>
        <img src={image} alt='' className='max-w-sm rounded'/>
        {/* span is used to give a loading line */}
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 
        ${ loading ? 'w-full transition-all duration-[10s]' : 'w-0' }`}></span>

      </div>

      {/* used to hide and show the loading text */}
      <p className={!loading ? 'hidden' : ''}>Loading......</p>
    </div>

  { !isImageLoaded && 
    <div className='flex w-full max-w-xl bg-neutral-500 
    text-white text-sm p-0.5 mt-10 rounded-full'>
      
      {/* onclick is used to give the value which we type in input box intially input is empty after it get filled by setinput function */}
      <input onChange={(e)=>setinput(e.target.value)} value={input} 
      type='text' placeholder='Describe what you want to generate' 
      className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'/>

      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 
      rounded-full'>Generate</button>
    </div>
  }
    

{/* used to show or hide the generate and download button */}
{  isImageLoaded &&
    <div className='flex gap-2 flex-wrap justify-center text-white 
    text-sm p-0.5  mt-10 rounded-full'>
      <p onClick={()=>setisImagesisLoaded(!isImageLoaded)} 
      className='bg-transparent border border-zinc-900 text-black 
      px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href={image} download className='bg-zinc-900 px-10 
      py-3 rounded-full cursor-pointer'>Download</a>
    </div>
}

    </motion.form>
  )
}

export default Result