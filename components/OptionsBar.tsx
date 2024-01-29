import React from 'react'
import { XCircle } from 'lucide-react';
import {motion} from 'framer-motion'

type InputValues = {
  ocassion: string,
  gender: string,
  age: number,
  description: string,
  priceRange: string
}

type Props = {
  inputValues: InputValues | undefined,
  setCard: React.Dispatch<React.SetStateAction<string>>;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    }
  }
};

const item = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeIn"
    }
  },
};

const OptionsBar: React.FC<Props> = ({ inputValues, setCard }) => {

  const valuesArray = inputValues ? Object.values(inputValues) : [];

  const maxDescriptionLength = 25;

  const displayForm = () => {
    setCard('form')
  }

  return (
    <div className='bg-blue-600 w-full p-2 pr-4'>
      <div className='flex justify-between items-center'>
        <motion.div className='flex gap-2 w-11/12 overflow-x-auto whitespace-nowrap rounded-lg'
          variants={container}
          initial="hidden"
          animate="visible">
          {valuesArray.map((value, index) => (
            <motion.div key={index}
              className='bg-neutral-100 p-2 rounded-xl shadow-md'
              variants={item}>
              {index === 3 && typeof value === 'string' && value.length > maxDescriptionLength
                  ? `${value.slice(0, maxDescriptionLength)}...`
                  : value
              }
            </motion.div>
          ))}
        </motion.div>
        <div className='text-white border-white ml-4 cursor-pointer'
          onClick={displayForm}>
          <XCircle size={30}/>
        </div>
      </div>
    </div>
  )
}

export default OptionsBar