'use client';
import { fetchDogBreeds, fetchDogIds, fetchDogsByIds } from '@/services/api';
import { redirect } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useAuth } from '@/Context/AuthContext';
import Filters from './Filters/page';
import DogList from './components/DogList';
import Pagination from './components/Pagination';
import { useBrowse } from './context/BrowseContext';
import FloatingButtonGroup from './components/FloatingButtonGroup';
import FavoriteList from './components/FavoriteList';
import Match from './components/Match';

const Browse: FC = () => {
  const {
    setDogs,
    filters,
    currentPage,
    setTotalPages,
    setTotalDogs,
    isFilterOpen,
    favoriteDogs,
    setAllBreeds,
    isMatchOpen,
    matchedDog,
  } = useBrowse();

  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      console.log('not logged in');
      redirect('/');
      return; // Exit early to prevent unnecessary API calls
    }

    const getAllBreeds = async () => {
      const breeds = await fetchDogBreeds();
      setAllBreeds(breeds);
    };

    const getDogs = async () => {
      const dogIds = await fetchDogIds(filters);
      setTotalDogs(dogIds.length);
      setTotalPages(Math.ceil(dogIds.length / 20)); // 20 dogs per page

      const paginatedIds = dogIds.slice(
        currentPage * 20,
        (currentPage + 1) * 20
      );
      const data = await fetchDogsByIds(paginatedIds);
      setDogs(data);
    };

    getAllBreeds();
    getDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage]);

  return (
    <div className="px-4 pb-8">
      <FloatingButtonGroup />

      {isFilterOpen && <Filters />}
      <h4 className="md:px-[5%] lg:px-[10%] my-4 font-bold">
        Dogs matching your filters
      </h4>
      <>
        <Pagination />
        <DogList />
        <Pagination />
      </>

      {/* Overlay for Favorites */}
      <FavoriteList favoriteDogs={favoriteDogs} />

      {isMatchOpen && <Match matchedDog={matchedDog} />}
    </div>
  );
};

export default Browse;
