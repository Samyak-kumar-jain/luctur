import { ChartNoAxesColumn, GraduationCap } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (basePath) =>
    `flex gap-4 cursor-pointer items-center py-2 px-4 rounded-lg transition-all duration-300 ease-in-out ${
      location.pathname.startsWith(basePath)
        ? 'bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg border-1 border-white'
        : 'text-gray-300 hover:text-white hover:bg-gradient-to-l hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500'
    }`;

  return (
    <div
      className="hidden mx-2 lg:block w-[250px] sm:w-[250px] bg-white/5 backdrop-blur-sm
      border border-gray-700 p-5 sticky top-0 h-[calc(100vh-5rem)] z-20 mt-20"
    >
      <div className="space-y-4">
        <Link to="/admin/dashboard" className={linkClasses('/admin/dashboard')}>
          <ChartNoAxesColumn size={24} />
          <h1 className='text-md'>Dashboard</h1>
        </Link>
        <Link to="/admin/add-course" className={linkClasses('/admin/add-course')}>
          <GraduationCap size={24} />
          <h1 className='text-md'>Courses</h1>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
