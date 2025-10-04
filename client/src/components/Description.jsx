import React from 'react'
import { assets } from '../assets/assets'
import { delay, motion } from "motion/react"

export default function Description() {
  return (
    <motion.div
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true}}
    className='flex flex-col items-center justify-center 
    my-24 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
        Create AI Images</h1>
        <p className='text-gray-500 mb-8'>Turn your imagination 
        into viusuals</p>

        <div className='flex gap-5 flex-col md:gap-14 md:flex-row items-center'>
            <img src={assets.sample_img_1} alt='' className='w-80 
            xl:w-96 rounded-lg'/>
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Images Generator</h2>
                <p className='text-gray-600 mb-4'>Easily bring your ideas to life with our free AI 
                image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching 
                </p>
                <p className='text-gray-600 mb-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat exercitationem tempora explicabo consequatur delectus nihil. Nobis quod ad unde quia consequuntur, quisquam commodi quae nemo tempora quam harum repellendus atque iste pariatur earum iusto explicabo. Exercitationem, quaerat. Quam recusandae hic omnis, laboriosam, amet quaerat dolorum similique placeat magni, sequi deserunt?</p>
            </div>
        </div>
        
    </motion.div>
  )
}
