import React from 'react';
import Paw from '../../../imgs/paw.png';
import Location from '../../../imgs/location.png';
import Favorite from '../../../imgs/favorite.png';
import Unfavorite from '../../../imgs/unfavorite.png';
import { Dog } from '@/types';
import Image from 'next/image';

interface DogCardProps {
  dog: Dog;
  onFavorite: (dog: Dog) => void;
  isFavorite: boolean;
}

const getAgeCategory = (age: number): string => {
  if (age < 1) return 'Puppy';
  if (age >= 1 && age <= 2) return 'Young';
  if (age >= 3 && age <= 7) return 'Adult';
  return 'Senior';
};

const DogCard: React.FC<DogCardProps> = ({ dog, onFavorite, isFavorite }) => {
  return (
    <div className="border rounded-md shadow-lg flex flex-col h-full hover:scale-105 transition-transform duration-200">
      <Image
        src={dog.img}
        alt={dog.name}
        width={500}
        height={400}
        className="w-full h-40 object-cover rounded-tr-md rounded-tl-md"
      />

      <div className="px-3 pb-3 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mt-2 flex justify-center">
          {dog.name}
        </h3>

        <div className="grid grid-cols-2 grid-rows-2 gap-3 pt-2">
          <div className="flex items-center gap-1">
            <Image src={Paw} alt="Paw Icon" width={16} height={16} />
            {dog.breed}
          </div>

          <div className="flex items-center justify-end">
            <p>{`${getAgeCategory(dog.age)} | ${dog.age}`}</p>
          </div>

          <div className="flex items-center gap-1">
            <Image src={Location} alt="Location Icon" width={16} height={16} />
            {dog.zip_code}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onFavorite(dog)}
              className="rounded-md hover:scale-125 transition-transform duration-200"
            >
              <Image
                src={isFavorite ? Unfavorite : Favorite}
                alt={isFavorite ? 'Unfavorite icon' : 'Favorite icon'}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
