import React from 'react'
import Sidebar from './Slidebar.jsx'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../Commom/AdminNavbar.jsx'

const Admin = () => {
  
  return (
   <div className=' w-full grid-background  flex'>
    <Sidebar/>


    <div className='flex flex-1 '>
        <AdminNavbar/>
        
       

        <div
  className="mx-3 mt-20 w-full p-3 md:p-11 relative mb-2 rounded-sm bg-opacity-10 backdrop-blur-sm border border-gray-700 overflow-hidden overflow-y-auto custom-scrollbar"
>
  <Outlet />
</div>


        </div>
    </div>
   
  )
}

export default Admin 