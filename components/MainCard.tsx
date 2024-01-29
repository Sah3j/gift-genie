import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import GiftForm from './GiftForm'
import Gifts from './Gifts'
import { motion, AnimatePresence } from 'framer-motion'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from './Navbar'

type Gift = {
  giftName: string,
  brandPage: string,
  retailerPage: string,
  price: string,
  Reason: string
}

type InputValues = {
  ocassion: string,
  gender: string,
  age: number,
  description: string,
  priceRange: string
}

const MainCard = () => {

  const [gifts, setGifts] = useState<Array<Gift>>([])
  const [inputValues, setInputValues] = useState<InputValues | undefined>()
  const [card, setCard] = useState<string>("form")

  return (
    <motion.div className='flex h-full items-center justify-center'
      initial={{ scale: 0 }}
      animate={{ scale: 1}}
      transition={{ duration: 1 }}>
      <Card className={`bg-gradient-to-tr from-cyan-200 to-blue-200 border-blue-600 rounded-none w-screen sm:w-auto sm:rounded-lg sm:border-4 h-full sm:h-4/5 overflow-y-auto`}>
        <CardContent className={`sm:w-[32rem] p-0 h-full`}>
          <div className='sm:hidden sticky top-0'>
            <Navbar />
          </div>
          {card === "form" && <GiftForm setGifts={setGifts} setCard={setCard} setInputValues={setInputValues}/>}
          {(card === "loading" || card === "gifts") && <Gifts inputValues={inputValues} gifts={gifts} card={card} setCard={setCard}/>}   
        </CardContent>
      </Card>
      
    </motion.div>
  )
}

export default MainCard