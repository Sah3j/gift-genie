import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='w-screen bg-purple-600 flex justify-between items-center py-1 px-4 sm:py-2 sm:px-16 sm:rounded-b-xl'>
      <div className='flex items-center gap-2'>
        <div>
          <Image src='/logo.png' width={50} height={50} alt="website logo" />
        </div>
        <h1 className='font-bold text-xl sm:text-2xl text-white pt-1'>Gift-Genie.</h1>
      </div>
      <div>
        <p className='font-semibold text-sm:text-base text-white'>Your AI gift generator</p>
      </div>
    </div>
  )
}

export default Navbar