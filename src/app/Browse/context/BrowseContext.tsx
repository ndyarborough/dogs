import { createContext, useContext, useState, ReactNode } from 'react';
import { Dog, DogFilters } from '@/types';

interface BrowseContextType {
  filters: DogFilters;
  setFilters: React.Dispatch<React.SetStateAction<DogFilters>>;
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  favoriteDogs: Dog[];
  toggleFavorite: (dog: Dog) => void;
  currentPage: number;
  totalPages: number;
  totalDogs: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setTotalDogs: (count: number) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoriteOpen: boolean;
  setIsFavoriteOpen: (isOpen: boolean) => void;
  isMatchOpen: boolean;
  setIsMatchOpen: (isOpen: boolean) => void;
  matchedDog: Dog | null;
  setMatchedDog: (dog: Dog | null) => void;
  location: { city: string; state: string };
  setLocation: React.Dispatch<
    React.SetStateAction<{ city: string; state: string }>
  >;
  allBreeds: string[];
  setAllBreeds: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrowseContext = createContext<BrowseContextType | undefined>(undefined);

export const BrowseProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<DogFilters>({
    breeds: [],
    zipCodes: [],
    ageMin: undefined,
    ageMax: undefined,
    sort: '',
  });
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDogs, setTotalDogs] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  const [location, setLocation] = useState({ city: '', state: '' });
  const [allBreeds, setAllBreeds] = useState<string[]>([]);

  const toggleFavorite = (dog: Dog) => {
    setFavoriteDogs((prev) =>
      prev.some((fav) => fav.id === dog.id)
        ? prev.filter((fav) => fav.id !== dog.id)
        : [...prev, dog]
    );
  };

  return (
    <BrowseContext.Provider
      value={{
        filters,
        setFilters,
        dogs,
        setDogs,
        favoriteDogs,
        toggleFavorite,
        currentPage,
        totalPages,
        totalDogs,
        setCurrentPage,
        setTotalPages,
        setTotalDogs,
        isFilterOpen,
        setIsFilterOpen,
        isFavoriteOpen,
        setIsFavoriteOpen,
        isMatchOpen,
        setIsMatchOpen,
        matchedDog,
        setMatchedDog,
        location,
        setLocation,
        allBreeds,
        setAllBreeds,
      }}
    >
      {children}
    </BrowseContext.Provider>
  );
};

export const useBrowse = () => {
  const context = useContext(BrowseContext);
  if (!context) {
    throw new Error('useBrowse must be used within a BrowseProvider');
  }
  return context;
};
