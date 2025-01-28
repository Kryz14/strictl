import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT '} text2={'US'} />     
    </div>
    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.aboutsm} alt='' />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to SM, where every stitch tells a story, and every design radiates boldness.

At SM, we redefine fashion as more than just clothing,it's an expression of identity, a statement of confidence, and a spark of inspiration. Our mission is to craft exceptional, high-quality pieces that empower you to stand tall, feel bold, and turn heads.  

Launched in 2024 by the visionary "Dammydrizzy," SM was born out of a life-changing challenge and transformative journey, turning a life-defining challenge into a mission to create exceptional wear for those who dare to stand out.  

Every piece in our collection is crafted with love, style, and purpose designed to make you feel unstoppable and leave a lasting impression. At SM, we don’t just create clothes; we create confidence.  

Step into the world of Strictly Messiah and let your style do the talking.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission at SM is to empower individuals to express their unique identities through bold, high-quality fashion. We strive to create exceptional pieces that inspire confidence, ignite self-expression, and turn everyday moments into unforgettable statements. At SM, we believe fashion is not just about clothing—it's about crafting confidence, sparking inspiration, and celebrating the bold spirit in everyone.</p>
      </div>
    </div>
    <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
    </div>
    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
      </div>
      
    </div>

    <NewsLetter />
    </div>
  )
}

export default About
