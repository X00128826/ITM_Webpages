
// Import dependencies
import * as showData from './dataAccess/showData.js';
import * as cinemaData from './dataAccess/cinemaData.js';
import * as adminData from "./dataAccess/adminData.js";

/*
  Functions used to update the index page view
*/

// Display event objects in a table element
//
function displayShowList(shows) {
  // Use the Array map method to iterate through the array of message documents
  // Each message will be formated as HTML table rows and added to the array
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // Finally the output array is inserted as the content into the <tbody id="showRows"> element.

  // page element where rows will be inserted
  const showRows = document.getElementById("showRows");


  const tableRows = shows.map((show) => {
    // Return a table row for each shows
    // each row added to the tableRows array
    return `<tr>
      <td>${show.id}</td>
      <td>${show.start_time}</td>
      <td>${show.cinema_id}</td>
      <td>${show.movie_id}</td>
      <td>${show.numSeatBooked}</td>
      <td>${moment(new Date(show.timestamp), 'DD MM YYYY hh:mm:ss')}</td>
      <td data-toggle="tooltip" 
        title="cinema_id=${show.cinema_id}">${show.cinema.location}
      </td>
      <td>
        <button data-show_id="${show.id}" 
        class="btn btn-sm btn-outline-danger btn-delete-show">
        <span class="bi bi-trash" data-toggle="tooltip" 
          title="Delete Show">
        </span></button>
      </td>
    </tr>`;
  }); // end shows.map

  // Add rows to the table body
  showRows.innerHTML = tableRows.join('');

    // Add Show listeners
  //
  // 1. Find button all elements with matching class name
  const deleteButtons = document.getElementsByClassName('btn-delete-show');

    // 2. Assign a 'click' show listener to each button
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteShow);
  }

} // End function

// 1. Parse JSON
// 2. Create computer links
// 3. Display in web page
//
function displayCinemas(cinemas) {

  // Use the Array map method to iterate through the array of cinemas (in json format)
  const cinLinks = cinemas.map((cin) => {

    // return a link button for each cineama, setting attribute data-cinema_id for the id
    // Also edit and delete buttons
    return `<div class="btn-group">
      <button data-cinema_id="${cin.id}" class="list-group-item list-group-item-action cinema-button">${cin.location}
      <button data-cinema_id="${cin.id}" 
          class="btn btn-sm btn-outline-primary btn-update-cinema" 
          data-bs-toggle="modal" data-bs-target="#CinemaFormDialog" >
          <span class="bi bi-pencil-square" 
          data-toggle="tooltip" title="Edit Cinema">
          </span>
      </button>
      <button data-cinema_id="${cin.id}" 
          class="btn btn-sm btn-outline-danger btn-delete-cinema">
          <span class="bi bi-trash" data-toggle="tooltip" 
          title="Delete Cinema">
          </span>
      </button>
    </div>`;

  }); // end cinemas.map

   // Add a link for 'all cinemas' to start of the list
  // first check cinLinks is an array
  console.log(cinLinks)
  if (Array.isArray(cinLinks)) {
    // Then use unshift to move all elements up one and insert a new element at the start
    // This button has cinema_id=0
    cinLinks.unshift(`<button data-cinema_id="0" 
                        class="list-group-item list-group-item-action cinema-button">
                        All Cinemas
                      </button>`);
  }

  // Set the innerHTML of the eventRows root element = rows
  // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
  document.getElementById('cinemaList').innerHTML = cinLinks.join("");

  // Add Event listeners to handle clicks
  // When clicked, the cinema links will filter events - displaying  shows for that cinema
  //
  // 1. Find button all elements with matching the class name used to identify cinema buttons
  const cinButtons = document.getElementsByClassName('cinema-button');
  const deleteButtons = document.getElementsByClassName('btn-delete-cinema');
  const updateButtons = document.getElementsByClassName('btn-update-cinema');

// 2. Assign a 'click' event listener to each button
  // When clicked the filterCinemas() function will be called.
  for (let i = 0; i < cinButtons.length; i++) {
    cinButtons[i].addEventListener('click', filterCinemas);
  }


  // Set up delete buutons
  // setup edit buttons
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteCinema);
    updateButtons[i].addEventListener('click', prepareUpdate);
  }
} // end function



// Show shows for the selected cinema
//
async function filterCinemas() {

    // Get id of cat link (from the data attribute)
    // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    const cinId = Number(this.dataset.cinema_id);
    console.log(cinId)
  
    // validation - if 0 or NaN reload everything
    if (isNaN(cinId) || cinId == 0) {
      loadAndDisplayData();
    
    // Otherwise get shows for this cinema
    } else {
  
      // Get shows
      const shows = await showData.getShowsByCinemaId(cinId);
  
      // If shows returned then display them
      if (Array.isArray(shows)) {
        displayShowList(shows);
      }
    }
  }

//
// Setup cinema form with defaults
//
function cinemaFormSetup(show, formTitle = 'Add a new Cinema') {
  // reset the form and change the title
  document.getElementById('cinemaForm').reset();
  document.getElementById('cinemaFormTitle').innerText = formTitle;

  // form reset doesn't work for hidden inputs!!
  // do this to rreset previous id if set
  document.getElementById("id").value = 0;
} // end function

// Fill the form when an edit button is clicked
async function prepareUpdate() {

  // Get the cinema using the cinema_id value of the clicked butoon
  const cin = await cinemaData.getCinemaById(this.dataset.cinema_id);

  // If found - fill the form
  if (cin) {
    //Set form input values
    cinemaFormSetup(0, `Update Cinema ID: ${cin.id}`);
    cinemaForm.id.value = cin.id;
    cinemaForm.screen_num.value = cin.screen_num;
    cinemaForm.location.value = cin.location;
    cinemaForm.standard_price.value = cin.standard_price;
    cinemaForm.numSeat.value = cin.numSeat;
    
  }

} // End function

// Get values from cinema form
// return as an object
function getCinemaFormData() {
  // use form and input NAMES to access values
  // Note: These should be validated!!
  return {
    id: Number(cinemaForm.id.value),
    screen_num: cinemaForm.screen_num.value, 
    location: cinemaForm.location.value, 
    standard_price: cinemaForm.standard_price.value,
    numSeat:  cinemaForm.numSeat.value
  };

} // End function

//
// Called when cinema form is submitted
//
async function addOrUpdateCinema() {
  const cin = getCinemaFormData();
  let result;

  // New cinema will have id set to 0
  if (cin.id === 0) {
    // add new
    result = await adminData.addCinema(cin);
  } else {
    // update existing
    result = await adminData.updateCinema(cin);
  }
  return result;
} // End function


// Delete event by id using an HTTP DELETE request
async function deleteCinema() {
  // Confirm delete
  if (confirm(`Are you sure you want to delete cinema id = ${this.dataset.cinema_id} ?`)) {
    // call the delete function (from adminData.js)
    // passing the data-cinema_id value of the clicked button
    const result = await adminData.deleteCinema(this.dataset.cinema_id);
  }
} // End function

// Delete show by id
async function deleteShow() {
  // Confirm delete
  if (confirm(`Are you sure you want to delete show id = ${this.dataset.show_id} ?`)) {
    // call the delete function (from adminData.js)
    // passing the data-show_id value of the clicked button
    const result = await adminData.deleteShowById(this.dataset.show_id);
  } 
} // End Function

// Get JSON array of shows
// Then pass that data for display
//
async function loadAndDisplayData() {
  
    // Load all cinemas and display
    const cinemas = await cinemaData.getAllCinemas();
    console.log("cinemas:", cinemas);
    displayCinemas(cinemas);
    
    // load all shows and display
    const shows = await showData.getAllShows();
    console.log("shows:", shows);
    displayShowList(shows);
  }
  
  // Add event listners to page elements
  document.getElementById('AddCinemaButton').addEventListener('click', cinemaFormSetup);

  // Add event listner to form submit/ save button
  // Second param is an inline function - used as the event object is required
  document.getElementById('formSubmit').addEventListener('click',addOrUpdateCinema);
  
  
  // Initial data load
  loadAndDisplayData();
  
  const showsSub = showData.Supabase
    .from('show')
    .on('*', loadAndDisplayData)
    .subscribe();
  