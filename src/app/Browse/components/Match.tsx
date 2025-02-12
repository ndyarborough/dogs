import { Dog } from '@/types';
import { useBrowse } from '../context/BrowseContext';
import DogCard from './DogCard';

const Match = ({ matchedDog }: { matchedDog: Dog | null }) => {
  const {
    favoriteDogs,
    toggleFavorite,
    isMatchOpen,
    setIsMatchOpen,
    setIsFavoriteOpen,
  } = useBrowse();

  const handleClose = () => setIsMatchOpen(false);
  const handleBackToFavorites = () => {
    setIsMatchOpen(false);
    setIsFavoriteOpen(true);
  };

  return isMatchOpen ? (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={handleClose}
      ></div>

      {/* Match Modal */}
      <div className="bg-primary p-6 mx-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto relative z-50 shadow-lg">
        <h2 className="text-xl font-semibold">Your Best Match</h2>

        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-xl"
        >
          ✖
        </button>

        <div className="flex flex-col items-center w-full mt-4">
          {matchedDog ? (
            <DogCard
              dog={matchedDog}
              isFavorite={favoriteDogs.some((fav) => fav.id === matchedDog.id)}
              onFavorite={toggleFavorite}
            />
          ) : (
            <p className="mt-2">No match found.</p>
          )}
        </div>

        <button
          onClick={handleBackToFavorites}
          className="bg-secondary text-primary w-full p-3 rounded mt-4"
        >
          Back to Favorite Dogs
        </button>
      </div>
    </div>
  ) : null;
};

export default Match;
