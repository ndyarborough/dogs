import { FC, ChangeEvent, FormEvent } from 'react';
import { fetchZipCodesByLocation } from '@/services/api';
import { useBrowse } from '../context/BrowseContext';
import { DogFilters } from '@/types';

const Filters: FC = () => {
  const { filters, setFilters, setDogs, location, setLocation, allBreeds } =
    useBrowse();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'city' || name === 'state') {
      setLocation((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFilters((prev: DogFilters) => ({
        ...prev,
        [name]:
          name === 'breeds' || name === 'zipCodes'
            ? value
              ? [value]
              : []
            : name === 'ageMin' || name === 'ageMax'
            ? value
              ? Number(value)
              : undefined
            : value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const zipCodes = await fetchZipCodesByLocation(
      location.city,
      location.state
    );
    if (zipCodes.length < 1) {
      setDogs([]);
    }
    setFilters((prev: DogFilters) => ({
      ...prev,
      zipCodes,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-secondary mx-auto border-accent border-1 p-4 max-w-[760px] flex flex-col gap-2"
    >
      <select
        name="breeds"
        value={filters.breeds?.[0] || ''}
        onChange={handleChange}
        className="select"
      >
        <option value="">Select a breed</option>
        {allBreeds.map((breed) => (
          <option key={breed} value={breed} className="option">
            {breed}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="zipCodes"
        placeholder="Zip Code"
        value={filters.zipCodes?.[0] || ''}
        onChange={handleChange}
        className="input-secondary hidden"
      />
      <input
        type="number"
        name="ageMin"
        placeholder="Min Age"
        value={filters.ageMin ?? ''}
        onChange={handleChange}
        className="input-secondary"
      />
      <input
        type="number"
        name="ageMax"
        placeholder="Max Age"
        value={filters.ageMax ?? ''}
        onChange={handleChange}
        className="input-secondary"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={location.city}
        onChange={handleChange}
        className="input-secondary"
      />
      <input
        type="text"
        name="state"
        placeholder="State (2-letter)"
        maxLength={2}
        value={location.state}
        onChange={handleChange}
        className="input-secondary"
      />

      <button className="btn-secondary" type="submit">
        Apply Filters
      </button>
    </form>
  );
};

export default Filters;
