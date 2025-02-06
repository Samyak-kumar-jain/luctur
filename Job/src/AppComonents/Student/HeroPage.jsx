import React from 'react'
import GlassNavbar from '../Commom/Navbar'
import { Outlet } from 'react-router-dom'

const HeroPage = () => {
  return (
    <div className='grid-background flex flex-col'>

        <GlassNavbar/>
        <div className='flex flex-col w-full mt-2 '>
            <Outlet/>
        </div>
    </div>
  )
}

export default HeroPage