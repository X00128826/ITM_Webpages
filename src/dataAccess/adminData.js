
/*
  Admin db access
*/

// Get a db connection by importing supabase.js which sets it up
import { Supabase } from './supabase.js';

// Insert a new cinema
async function addCinema(cin) {
    console.log('insert cinema id: ', cin.id);
    const result = await Supabase
    .from('cinema')
    .insert([
        { screen_num: cin.screen_num, 
        location: cin.location,
        standard_price: cin.standard_price, 
        numSeat:  cin.numSeat
        },
    ]);

    // return the result data
    return result.data;
} // end function

// update an existing cinema
async function updateCinema(cin) {
    console.log('to update: ', cin.id);
    const result= await Supabase
    .from('cinema')
    .update([
        {screen_num: cin.screen_num, 
        location: cin.location,
        standard_price: cin.standard_price, 
        numSeat:  cin.numSeat
        },
    ])
    // update where id matches comp.id
    .eq('id', cin.id);

    // return the result data
    return result.data;
}

// delete a cinema
async function deleteCinema(id) {

    // before deleting cinema, delete its shows
    const del_Shows = deleteCinemaShows(id);
    
    const result= await Supabase
    .from('show')
    .delete()
    .eq('id', id);

    // return the result data
    return result.data;
}

// delete a cinemas shows
async function deleteCinemaShows(cin_id) {
    
    const result= await Supabase
    .from('show')
    .delete()
    .eq('cinema_id', cin_id);

    // return the result data
    return result.data;
}

// delete an show
async function deleteShowById(id) {
    
    const result= await Supabase
    .from('show')
    .delete()
    .eq('id', id);

    // return the result data
    return result.data;
}

// Export functions for import elsewhere
export {
    addCinema,
    updateCinema,
    deleteCinema,
    deleteShowById,
    deleteCinemaShows
  };