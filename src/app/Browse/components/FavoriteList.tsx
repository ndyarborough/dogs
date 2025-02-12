import { Dog } from '@/types';
import { useBrowse } from '../context/BrowseContext';
import DogCard from './DogCard';
import { fetchDogsByIds, fetchMatchedDog } from '@/services/api';

const FavoriteList = ({ favoriteDogs }: { favoriteDogs: Dog[] }) => {
  const {
    toggleFavorite,
    isFavoriteOpen,
    setIsFavoriteOpen,
    setIsMatchOpen,
    setMatchedDog,
  } = useBrowse();

  const handleClose = () => setIsFavoriteOpen(false);

  const handleFindDog = async () => {
    setIsFavoriteOpen(false); // Close FavoriteList
    setIsMatchOpen(true); // Open Match modal

    if (favoriteDogs.length === 0) return; // No dogs to match

    // Extract favorite dog IDs
    const dogIds = favoriteDogs.map((dog) => dog.id);

    // Fetch the matched dog ID
    const matchedDogId = await fetchMatchedDog(dogIds);
    if (!matchedDogId) return;

    // Fetch full dog details
    const matchedDogs = await fetchDogsByIds([matchedDogId]);

    // Update context with matched dog
    if (matchedDogs.length > 0) {
      setMatchedDog(matchedDogs[0]);
    }
  };

  return isFavoriteOpen ? (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={handleClose}
      ></div>

      {/* Favorite List Modal */}
      <div className="bg-primary p-6 mx-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto relative z-50 shadow-lg">
        <h3 className="text-xl font-semibold">Your Favorites</h3>

        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-xl"
        >
          ✖
        </button>

        <button className="btn w-full mt-4" onClick={handleFindDog}>
          Find my Dog!
        </button>

        <div className="flex flex-col gap-4 mt-4">
          {favoriteDogs.length > 0 ? (
            favoriteDogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorite={true}
                onFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p>You haven&apos;t favorited any dogs yet.</p>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default FavoriteList;
