/*
  Functions used to work with Event related data
*/


// Get a db connection
import { Supabase } from './supabase.js';

//
// Get all showsS as a list (array) of show Objects
// Also replace the cinema id with name in each show
//
async function getAllShows(orderCol= 'timestamp', asc = false) {

    // define variable to store shows
    let shows;

    // execute request
    // Note await in try/catch block
    try {
      // IMPORTANT FOR OUR DATABASE!!!!!!
      // Supabase API query equivelent to:
      // select *, cinema.location from shows, cinema order by timestamp desc;
      const result = await Supabase
      .from('show')
      .select('*, cinema(location)')
      .order(orderCol, { ascending: asc });
        

      // result.data contains the shows
      shows = await result.data;
      // Debug
      console.log('show: ', result.data);

      // Catch and log errors to server side console
    } catch (error) {
      console.log("Supabase Error - get all shows: ", error.message);
    } finally {
    }
    // return all products found
    return shows;
}


async function getShowById(id) {

  // to do: validate id

  // define variable to store shows
  let show;

  // execute request
  // Note await in try/catch block
  try {
    // Execute the query
    const result = await Supabase
      .from('show')
      .select('*, cinema(location)')
      .eq('id', id)
      .order('timestamp', { ascending: false });

    // first element of the record set contains products
    show = await result.data;
    console.log('shows: ', result.data);

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }
  // return all products found
  return show;
}

// Get shows for a cinema, by its id
//
async function getShowsByCinemaId(id) {

  // to do: validate id

  // define variable to store shows
  let shows;

  // execute db query
  try {
    // Execute the query
    const result = await Supabase
      .from('show') // select from shows
      .select('*, cinema(location)') // * from shows and name from cinemas
      .eq('cinema_id', id) // where cinema_id == id
      .order('timestamp', { ascending: false }); // order by timestamp

    // first element of the recordset contains products
    shows = await result.data;
    console.log('shows: ', result.data);

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }
  // return all products found
  return shows;
}

async function getShowsByMovieId(id) {

  // to do: validate id

  // define variable to store shows
  let shows;

  // execute db query
  try {
    // Execute the query
    const result = await Supabase
      .from('show') // select from shows
      .select('*, movies(title)') // * from shows and name from cinemas
      .eq('movie_id', id) // where cinema_id == id
      .order('timestamp', { ascending: false }); // order by timestamp

    // first element of the recordset contains products
    shows = await result.data;
    console.log('shows: ', result.data);

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }
  // return all products found
  return shows;
}

async function insertMovies() {

  // to do: validate id

  // define variable to store shows
  let shows;

  // execute db query
  try {
    // Execute the query
    const result = await Supabase
      .insert('show')
      .select('title, maturity_rating, running_time') 
      .from('movies') // select from shows
    // * from shows and name from cinemas
      

    // first element of the recordset contains products
    shows = await result.data;
    console.log('show: ', result.data);

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }
  // return all products found
  return shows;
}

// Find shows using a text search
// https://supabase.com/docs/reference/javascript/textsearch
// https://supabase.com/docs/reference/javascript/using-filters
async function searchFilter(search) {
  // define variable to store shows
  let shows;

  // execute request
  try {
    // Execute the query
    const result = await Supabase
      .from('show') // from shows
      .select('*, cinema(location), movies(title)') // select all and cinema.location
      .textSearch('start_time', `'${search}'`) // filter result where description contains the search term
      .order('timestamp', { ascending: false }); // sort by timestamp

    // get data from result
    shows = await result.data;
    //console.log('shows: ', result.data);

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }
  // return all shows found
  return shows;
}

// Export
export {
  Supabase,
  getAllShows,
  getShowById,
  getShowsByCinemaId,
  getShowsByMovieId,
  insertMovies,
  searchFilter
};
