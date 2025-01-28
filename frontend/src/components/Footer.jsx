import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
    <div className="flex flex-col sm:flex-row justify-between gap-14 my-10 mt-40 text-sm">
        <div className="flex-1">
            <img src={assets.logos} className="mb-5 w-32" alt="" />
            
        </div>
        <div className="flex-1">
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="flex-1">
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+234812272985</li>
                <li>strictlymessiah58@gmail.com</li>
            </ul>
        </div>
    </div>
    <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ strictlymessiah.com - All Right Reserved</p>
    </div>
</div>

  )
}

export default Footer
