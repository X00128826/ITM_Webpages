
/*
  Functions used to work with Event related data
*/


// Get a db connection
import { Supabase } from './supabase.js';

//
// Get all events as a list (array) of Event Objects
// Also replace the Computer id with name in each event
//
async function getAllMovies() {

    // define variable to store events
    let movies;

    // execute request
    // Note await in try/catch block
    try {
      // IMPORTANT FOR OUR DATABASE!!!!!!
      // Supabase API query equivelent to:
      // select *, computers.name from events, computers order by timestamp desc;
      let result = await Supabase
        .from('movies')
        .select('*')
        .order('title')
        

      // rresult.data contains the events
      movies = await result.data;
      // Debug
      //console.log('events: ', result.data);

      // Catch and log errors to server side console
    } catch (error) {
      console.log("Supabase Error - get all movies: ", error.message);
    } finally {
    }
    // return all products found
    return movies;
}

//
async function getMoviesId(id) {

  // 1. define variable to store events
  let movies;

  // 1. execute query to get computers
  try {
    // 2. store result
    const result = await Supabase
      .from('movies') // select data from the computers table
      .select('*') // all columns
      .eq('id', id); // where id = id

    // 3. Read data from the result
    movies = await result.data;

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }

  // 4. return all movies found
  return movies[0];
}

// Export
export {
  getAllMovies,
  getMoviesId
};