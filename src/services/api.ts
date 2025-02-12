import { Dog, DogFilters } from '../types';

const API_URL = 'https://frontend-take-home-service.fetch.com';

// Authentication

// You will need to hit the login endpoint in order to access other endpoints. A successful request to the login
// endpoint will return an auth cookie included in the set-cookie response header. It’s an HttpOnly cookie, so you
// will not be able to access this value from any Javascript code (nor should you need to).

//  Your browser will automatically send this cookie with all successive credentialed requests to the API. Note
// that you will need to pass a config option in order to send credentials (cookies) with each request. Some
// documentation to help you with this:

// Including credentials with fetch (set credentials: 'include' in request config)
// Including credentials with axios (set withCredentials: true in request config)

////// Routes ////////

export async function checkAuth(): Promise<boolean> {
  const response = await fetch(`${API_URL}/dogs/breeds`, {
    credentials: 'include',
  });
  return response.ok;
}

export async function login(
  name: string,
  email: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to login');
    // return { success: false, message: 'Failed to login' };
  }

  return { success: true, message: 'Successfully logged in' };
}

// POST /auth/logout

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

// Hit this endpoint to end a user’s session. This will invalidate the auth cookie.

// GET /dogs/breeds

export const fetchDogBreeds = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/dogs/breeds`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch dog breeds');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    return [];
  }
};

// GET /dogs/search

// Query Parameters
// The following query parameters can be supplied to filter the search results. All are optional; if none are provided, the search will match all dogs.

export const fetchDogIds = async (
  filters: DogFilters,
  size = 100,
  from?: number
): Promise<string[]> => {
  const params = new URLSearchParams();
  if (filters.breeds) {
    filters.breeds.forEach((breed) => params.append('breeds', breed));
  }
  if (filters.zipCodes) {
    filters.zipCodes.forEach((zip) => params.append('zipCodes', zip));
  }
  if (filters.ageMin) params.append('ageMin', filters.ageMin.toString());
  if (filters.ageMax) params.append('ageMax', filters.ageMax.toString());
  params.append('size', size.toString());
  if (from) params.append('from', from.toString());
  if (filters.sort) params.append('sort', filters.sort);

  const response = await fetch(`${API_URL}/dogs/search?${params.toString()}`, {
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    return data.resultIds;
  }
  return [];
};

// POST /dogs

// Body Parameters
// The body should be an array of no more than 100 dog IDs to fetch (no pun intended).

// body: string[]

// Return Value
// Returns an array of dog objects

export const fetchDogsByIds = async (ids: string[]): Promise<Dog[]> => {
  const response = await fetch(`${API_URL}/dogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ids),
    credentials: 'include',
  });

  if (response.ok) {
    return response.json();
  }
  return [];
};

// POST /dogs/match

export const fetchMatchedDog = async (
  ids: string[]
): Promise<string | null> => {
  const response = await fetch(`${API_URL}/dogs/match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ids),
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('Failed to fetch matched dog');
    return null;
  }

  const data: { match: string } = await response.json();
  return data.match;
};

// POST /locations

// Body Parameters
// The body of this request should be an array of no more than 100 ZIP codes.

// body: string[]

// Return Value
// Returns an array of Location objects.

// POST /locations/search
export const fetchZipCodesByLocation = async (
  city?: string,
  state?: string
): Promise<string[]> => {
  if (!city && !state) {
    console.warn('No city or state provided for zip code search');
    return [];
  }
  const body: { city?: string; states?: string[]; size?: number } = {
    size: 100,
  };
  if (city) body.city = city;
  if (state) body.states = [state.toUpperCase()];

  const response = await fetch(`${API_URL}/locations/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('Failed to fetch locations');
    return [];
  }

  const data = await response.json();

  const zipCodes =
    data.results?.map((location: { zip_code: string }) => location.zip_code) ||
    [];
  return zipCodes;
};
