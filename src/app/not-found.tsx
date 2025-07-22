'use client'
import React from 'react'
import {motion} from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

const Error = () => {
  return (
    <div className='w-full max-w-full pt-40 flex justify-center items-center flex-col text-gray-500'>
        <h2 className='text-6xl sm:text-9xl flex flex-row gap-2'>{4} {<motion.div initial={{rotateY: 0}} animate={{ rotateY: 360}} transition={{duration: 2,repeat: Infinity, ease: "linear"}}>
            <Image alt="coin-1" src={'/3dicons-dollar-front-premium.png'} width={128} height={128}/> 
        </motion.div>} {4}</h2>
        <h2 className=''>Error Not Found</h2>
        <Link href={'/'} className='underline hover:text-[#991ef9]'>back to home</Link>
    </div>
  )
}

export default Error