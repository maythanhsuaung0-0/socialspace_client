import Image from 'next/image'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { AiFillMessage } from "react-icons/ai";
const Navbar = () => {
  return (
    <div className='w-full top-0 left-0 bg-[#242526] text-white fixed px-4 border-b border-gray-700 z-50'>
      <ul className='w-[98%] m-auto flex flex-row gap-3 '>
        <li className='self-center'>
            <Image src="/Logo.svg" alt="logo" className='h-auto w-[40px]'  width={50} height={50} />
        </li>
        <li className='self-center'>
          <div className='flex flex-row gap-2 w-full py-2 px-4 bg-[#3A3B3C] hover:bg-[#4b4c4e] text-gray-100 rounded-full'>
            <FaSearch className='text-gray-200 self-center' />
          <input
            type='text'
            placeholder='Search'
          className='bg-transparent focus:outline-none text-gray-100'
          />
          </div>
        </li>
        <li className=' flex flex-row gap-3 m-auto w-[60%]'>
          <div className='py-4 px-8 border-b-2 border-blue-500'>
            <GoHomeFill className='text-2xl self-center' />
          </div>
          <div className='py-4 px-8'>
            <GoHomeFill className='text-2xl self-center' />
          </div>
          <div className='py-4 px-8'>
            <GoHomeFill className='text-2xl self-center' />
          </div>
        </li>
        <li className='self-center flex flex-row gap-2 ml-auto'>
          <div className='p-2 rounded-full bg-[#3A3B3C] cursor-pointer'>
            <AiFillMessage className='text-2xl' />
          </div>
          <div className='rounded-full grid justify-center w-10 h-10 bg-red-400 text-white'>
            <span className='self-center'>M</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
