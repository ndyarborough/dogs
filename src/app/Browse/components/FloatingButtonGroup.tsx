'use client';
import React from 'react';
import BackArrow from '../../../imgs/back-arrow.png';
import Logout from '../../../imgs/logout.png';
import FilterImage from '../../../imgs/filter.png';
import Heart from '../../../imgs/favorite.png';
import { useAuth } from '@/Context/AuthContext';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useBrowse } from '../context/BrowseContext';
import Filters from '../Filters/page';

const FloatingButtonGroup: React.FC = () => {
  const { setIsFilterOpen, setIsFavoriteOpen, favoriteDogs, isFilterOpen } =
    useBrowse();
  const { handleLogout } = useAuth();

  return (
    <div className="sticky bg-gradient top-0 flex flex-col py-2 mb-5 gap-2 z-50">
      {/* Buttons Row */}
      <div className="flex justify-between gap-2 px-2">
        {/* Left Side: Back to Home and Logout */}
        <div className="flex gap-2">
          <button
            onClick={() => redirect('/')}
            className="bg-primary border-1 p-2 rounded-full flex items-center justify-center gap-2"
          >
            <Image src={BackArrow} alt="back arrow icon" />
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-primary border-1 p-2 rounded-full flex items-center justify-center gap-2"
          >
            <Image src={Logout} alt="Logout Icon" className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Right Side: Filters and Favorites */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsFavoriteOpen(true)}
            className="bg-primary border-1 p-2 rounded-full flex items-center justify-center gap-2"
          >
            <Image src={Heart} alt="Favorites Icon" className="w-5 h-5" />
            {favoriteDogs.length}
          </button>
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="bg-primary border-1 p-2 rounded-full flex items-center justify-center gap-2"
          >
            <Image src={FilterImage} alt="Filter Icon" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Conditional Filters */}
      {isFilterOpen && <Filters />}
    </div>
  );
};

export default FloatingButtonGroup;
