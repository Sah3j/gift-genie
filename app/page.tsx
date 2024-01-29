'use client'

import Image from 'next/image'
import { useState } from 'react'
import Background from '@/components/Background'
import MainCard from '@/components/MainCard'
import Navbar from '@/components/Navbar'

export default function Home() {

  return (
    <div className='relative'>
      <div className='fixed top-0 left-0 hidden sm:block'>
        <Navbar/>
      </div>
      <div>
        <Background/>
      </div>
      <div className='absolute top-0 left-0 w-screen h-dvh'>
        <MainCard/>
      </div>
    </div>
  )
}
