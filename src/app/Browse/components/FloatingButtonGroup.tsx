import React from 'react';
import BackArrow from '../../../imgs/back-arrow.png';
import Logout from '../../../imgs/logout.png';
import FilterImage from '../../../imgs/filter.png';
import Heart from '../../../imgs/favorite.png';
import { useAuth } from '@/Context/AuthContext';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useBrowse } from '../context/BrowseContext';

const FloatingButtonGroup: React.FC = () => {
  const { isFilterOpen, setIsFilterOpen, setIsFavoriteOpen, favoriteDogs } =
    useBrowse();
  const { handleLogout } = useAuth();

  return (
    <div className="sticky bg-primary top-0 flex flex-wrap justify-center md:justify-end md:pr-4 py-2 mb-5 gap-2 md:gap-6 z-50">
      <button
        onClick={() => redirect('/')}
        className="border-1 p-2 rounded-full flex items-center justify-center gap-2"
      >
        <Image src={BackArrow} alt="back arrow icon" />
        Back to Home
      </button>
      <button
        onClick={handleLogout}
        className="border-1 p-2 rounded-full flex items-center justify-center gap-2"
      >
        <Image src={Logout} alt="Logout Icon" className="w-5 h-5" />
        Logout
      </button>
      <button
        onClick={() => setIsFilterOpen((prev) => !prev)}
        className="border-1 p-2 rounded-full flex items-center justify-center gap-2"
      >
        <Image src={FilterImage} alt="Filter Icon" className="w-5 h-5" />
        {isFilterOpen ? 'Close Filters' : 'Filters'}
      </button>

      <button
        onClick={() => setIsFavoriteOpen(true)}
        className="border-1 p-2 rounded-full flex items-center justify-center gap-2"
      >
        <Image src={Heart} alt="Favorites Icon" className="w-5 h-5" />
        Favorites ({favoriteDogs.length})
      </button>
    </div>
  );
};

export default FloatingButtonGroup;
