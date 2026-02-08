import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonial from '../components/Testimonials'
import Generatebtn from '../components/GenerateBtn'

function Home() {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonial />
      <Generatebtn />
    </div>
  )
}

export default Home