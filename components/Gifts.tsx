import React from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react';
import {motion} from 'framer-motion'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import OptionsBar from './OptionsBar';

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

type Props = {
  inputValues: InputValues | undefined,
  gifts: Gift[],
  card: string,
  setCard: React.Dispatch<React.SetStateAction<string>>;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Gifts: React.FC<Props> = ({ inputValues, card, gifts, setCard }) => {

  const gradients = [
    'bg-gradient-to-tr from-rose-600 to-fuchsia-600',
    'bg-gradient-to-tr from-purple-600 to-indigo-600',
    'bg-gradient-to-tr from-blue-600 to-cyan-600',
    'bg-gradient-to-tr from-red-600 to-amber-600',
    'bg-gradient-to-tr from-emerald-600 to-lime-600',
  ]

  return (
    <motion.div className='h-full'>
      {card === "loading" && 
        <div className='h-full flex flex-col justify-center items-center'>
          <div className='w-24 h-24 animate-pulse'>
            <Image src="/logo.png" width={100} height={100} alt='loading logo' layout='responsive'/>
          </div>
          <p className='font-bold neutral-800'>
            Generating gifts...
          </p>
        </div>
      } 
      {card === "gifts" && 
        <Card className='bg-transparent shadow-none border-0'>
          <div className='sticky top-0 drop-shadow'>
            <OptionsBar inputValues={inputValues} setCard={setCard}/>
          </div> 
        <CardHeader className='p-2 pt-4'>
          <CardTitle>Your curated list of gifts:</CardTitle>
        </CardHeader>
        <CardContent className='px-0'>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible">
            {gifts.map((gift, index) => (
              <motion.div key={index} className='m-2' variants={item}>
                <div className={`p-2 ${gradients[index]} rounded-md flex flex-col`}>
                  <div className='flex justify-between'>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
                      {gift.giftName}
                    </h4>
                    <p className="leading-7 text-white">
                      ${gift.price}
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    {gift.Reason}
                  </p>
                  <div className='flex gap-2 mt-2'>
                  <div className='flex rounded-lg bg-white opacity-35 px-2 py-1'>
                      <a href={gift.brandPage} target='_blank' rel='noopener noreferrer' className='flex'>
                        <span className='max-w-[120px] inline-block overflow-hidden whitespace-nowrap overflow-ellipsis mr-2'>
                          {new URL(gift.brandPage).hostname}
                        </span>
                        <ExternalLink className='self-center'/>
                      </a>
                    </div>
                    <div className='flex rounded-lg bg-white opacity-35 px-2 py-1'>
                      <a href={gift.retailerPage} target='_blank' rel='noopener noreferrer' className='flex'>
                        <span className='max-w-[120px] inline-block overflow-hidden whitespace-nowrap overflow-ellipsis mr-2'>
                          {new URL(gift.retailerPage).hostname}
                        </span>
                        <ExternalLink className='self-center'/>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
        </Card>
      }
    </motion.div>
  )
}

export default Gifts