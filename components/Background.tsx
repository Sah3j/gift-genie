'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion"

const Background = () => {

  const icons:Array<string> = [
    '/icon-gift.png', '/icon-star.png', '/icon-star1.png', '/icon-wand.png',
  ]

  const randomIconsRow = (icons:Array<string>, index:number) => {
    const iconElements:JSX.Element[] = []
    const col = 7

    for (let i = 0; i < col; i++) {
      const randomIndex = Math.floor(Math.random() * Math.floor(4))
      const iconSrc = icons[randomIndex];
      const uniqueKey = `icon-${iconSrc}-${index}-${i}`
      iconElements.push(
        <motion.div key={uniqueKey} className='w-4 h-4 sm:w-6 sm:h-6'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{opacity: 0, scale: 0.5}}
          transition={{ duration: 0.5 }}
        >
          <Image src={icons[randomIndex]} width={30} height={30} alt={`Icon ${col}`} layout="fixed"/>
        </motion.div>
      )
    }

    return (
      <div className={`flex justify-between ${index % 2 == 0 ? 'sm:justify-between' : 'sm:justify-evenly'}`}>
        {iconElements}
      </div>
    )
  }

  const iconRows = (icons:Array<string>) => {
    const rows = 7
    const iconRows:JSX.Element[] = []

    for (let i = 0; i < rows; i++) {
      iconRows.push(
        randomIconsRow(icons, i)
      )
    }

    return (
      <div className='h-full flex flex-col justify-between'>
        {iconRows}
      </div>
    )
  }


  const [renderTrigger, setRenderTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderTrigger(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-dvh w-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-amber-500 to-amber-600 p-2 sm:p-4 md:p-8'>
      <div className='h-full'>
        {iconRows(icons)}
      </div>
    </div>
  )
}

export default Background