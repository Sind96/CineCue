import * as streamingAvailability from 'streaming-availability';

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY || '';


async function getEvents () {
  try {
    const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
      apiKey: RAPID_API_KEY
    }));

    const data = await client.showsApi.searchShowsByFilters({
      country: 'gb',
      showType: 'movie',
      rating_min: '85',
      orderBy: 'rating',
      yearMin: 1970,
      orderDirection: 'desc',
    });
    return data;
  } catch (e) {
    console.log('There has been an error fetching data:', e);
  }
}

async function getTrendingEvents () {
  try {
    const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
      apiKey: RAPID_API_KEY
    }));

    const data = await client.showsApi.searchShowsByFilters({
      country: 'gb',
      showType: 'movie',
      rating_min: '60',
      orderBy: 'rating',
      yearMin: 2024,
      orderDirection: 'desc',
    });
    return data;
  } catch (e) {
    console.log('There has been an error fetching data:', e);
  }
}

async function getComedyEvents () {
  try {
    const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
      apiKey: RAPID_API_KEY
    }));

    const data = await client.showsApi.searchShowsByFilters({
      country: 'gb',
      showType: 'movie',
      ratingMin: 60,
      orderBy: 'rating',
      yearMin: 1970,
      orderDirection: 'desc',
      genres: ['comedy']
    });
    return data;
  } catch (e) {
    console.log('There has been an error fetching data:', e);
  }
}

async function getActionEvents () {
  try {
    const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
      apiKey: RAPID_API_KEY
    }));

    const data = await client.showsApi.searchShowsByFilters({
      country: 'gb',
      showType: 'movie',
      ratingMin: 60,
      orderBy: 'rating',
      yearMin: 1970,
      orderDirection: 'desc',
      genres: ['action']
    });
    return data;
  } catch (e) {
    console.log('There has been an error fetching data:', e);
  }
}


export { getEvents, getTrendingEvents, getComedyEvents, getActionEvents };