/*
  Functions used to work with Event related data
*/


// Get a db connection
import { Supabase } from './supabase.js';

//
// Get all events as a list (array) of Event Objects
// Also replace the Computer id with name in each event
//
async function getAllCinemas() {

    // define variable to store events
    let cinemas;

    // execute request
    // Note await in try/catch block
    try {
      // IMPORTANT FOR OUR DATABASE!!!!!!
      // Supabase API query equivelent to:
      // select *, cinema.name from shows, cinema order by timestamp desc;
      const result = await Supabase
        .from('cinema')
        .select('*')
        .order('location', { ascending: true });
        

      // rresult.data contains the shows
      cinemas = await result.data;
      // Debug
      console.log('show: ', result.data);

      // Catch and log errors to server side console
    } catch (error) {
      console.log("Supabase Error - get all cinema: ", error.message);
    } finally {
    }
    // return all products found
    return cinemas;
}

// Function to get all events from supabase
//
async function getCinemaById(id) {

  // 1. define variable to store events
  let cinema;

  // 1. execute query to get computers
  try {
    // 2. store result
    const result = await Supabase
      .from('cinema') // select data from the computers table
      .select('*') // all columns
      .eq('id', id); // where id = id

    // 3. Read data from the result
    cinema = await result.data;

    // Catch and log errors to server side console
  } catch (error) {
    console.log("Supabase Error - get all shows: ", error.message);
  } finally {
  }

  // 4. return all cinemas found
  return cinema[0];
}


// Export
export {
  getAllCinemas,
  getCinemaById
};
