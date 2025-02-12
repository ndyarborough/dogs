import React from 'react';
import { useBrowse } from '../context/BrowseContext';
import DogCard from './DogCard';

const DogList: React.FC = () => {
  const { dogs, favoriteDogs, toggleFavorite } = useBrowse();

  return (
    <div className="md:px-[5%] lg:px-[10%]">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
        {dogs.length > 0 ? (
          dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              onFavorite={toggleFavorite}
              isFavorite={favoriteDogs.some((fav) => fav.id === dog.id)}
            />
          ))
        ) : (
          <p>No dogs found for this breed.</p>
        )}
      </ul>
    </div>
  );
};

export default DogList;
