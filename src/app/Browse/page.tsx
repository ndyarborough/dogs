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
      const { resultIds, total } = await fetchDogIds(
        filters,
        20,
        currentPage * 20
      ); // 20 dogs per page

      setTotalDogs(total);
      setTotalPages(Math.ceil(total / 20)); // Calculate total pages based on the total dogs

      const data = await fetchDogsByIds(resultIds); // Fetch details for the dog IDs
      setDogs(data);
    };

    getAllBreeds();
    getDogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage, loggedIn]);

  return (
    <div className="pb-8">
      <FloatingButtonGroup />

      {isFilterOpen && <Filters />}
      <h4 className=" px-[5%] lg:px-[10%] my-4 font-bold">
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
