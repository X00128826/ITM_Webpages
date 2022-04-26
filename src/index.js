

// Import showData dependency allowing access to its exported functions
import * as showData from './dataAccess/showData.js';
import * as cinemaData from './dataAccess/cinemaData.js';
import * as movieData from './dataAccess/movieData.js';


/*
  Functions used to update the index page view
*/


// Display show objects in a table element
//
function displayShowList(shows) {

  // Use the Array map method to iterate through the array of message documents
  // Each message will be formated as HTML table rows and added to the array
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // Finally the output array is inserted as the content into the <tbody id="showRows"> element.

  const showRows = document.getElementById("showRows");
  
  const tableRows = shows.map(show => {

    // Note: the following is a template string, enclosed by `backticks` and not 'single quotes'
    // This allows ${JavaScript} to be added directly to the string if enclosed by ${ }
    // See https://wesbos.com/template-strings-html for more.

    // A row is returned for each show found in shows.
    // rows are added to tableRows

    const levelStyle = getAlertStyle(show.level);
   

    return `<tr class="${levelStyle.alert}">
            <td>${show.id}</td>
            <td>${show.start_time}</td>
            <td>${show.cinema_id}</td>
            <td>${show.movie_id}</td>
            <td>${show.numSeatBooked}</td>
            <td>${show.movie_title}</td>

          <!-- convert timestamp to ISO date time string -->
          
         

          <!-- add a tooltip - visible when mouse hovers over the element -->
          
          
          
      </tr>`;
  });

  // Add rows to the table body
  showRows.innerHTML = tableRows.join('');
}

// 1. Parse JSON
// 2. Create cinema links
// 3. Display in web page
//
function displayCinemas(cinemas) {

  // Use the Array map method to iterate through the array of categories (in json format)
  const cinLinks = cinemas.map((cin) => {
    
    // return a link button for each cinema, setting attribute data-cinema_id for the id
    // the data attribute is used instead of id as an id value can only be used once in the document
    // note the cinema-link css class - used to identify the buttons (used later)
    return `<button data-cinema_id="${cin.id}" class="list-group-item list-group-item-action cinema-button">
              ${cin.location}
            </button>`;

  });

  // Add a link for 'all cinemas' to start of the list
  // first check compLinks is an array
  console.log(cinLinks)
  if (Array.isArray(cinLinks)) {
    // Then use unshift to move all elements up one and insert a new element at the start
    // This button has cinema_id=0
    cinLinks.unshift(`<button data-cinema_id="0" 
                        class="list-group-item list-group-item-action cinema-button">
                        All Cinemas
                      </button>`);
  }

  // Set the innerHTML of the productRows root element = rows
  // join('') converts the rows array to a string, replacing the ',' delimiter with '' (blank)
  document.getElementById('cinemaList').innerHTML = cinLinks.join("");

  // Add Event listeners to handle clicks
  // When clicked, the cinema links will filter shows - displaying  shows for that cinema
  //
  // 1. Find button all elements with matching the class name used to identify cinema buttons
  const cinButtons = document.getElementsByClassName('cinema-button');

  // 2. Assign a 'click' event listener to each button
  // When clicked the filterComputer() function will be called.
  for (let i = 0; i < cinButtons.length; i++) {
    cinButtons[i].addEventListener('click', filterCinemas);
  }
}


// Return event styling depending on level
// icons - https://icons.getbootstrap.com/

function getAlertStyle(level) {
  const error = {
    alert: 'alert alert-danger',
    icon: 'bi bi-bug-fill'
  };

  const warning = {
    alert: 'alert alert-warning',
    icon: 'bi bi-exclamation-triangle-fill'
  };

  const information = {
    alert: 'alert alert-info',
    icon: 'bi bi-info-circle-fill'
  };

  const _default = {
    alert: 'alert alert-light',
    icon: 'bi bi-calendar3-event-fill'
  };

  // return style object based on level value
  switch (level) {
    case 'error':
      return error;
    case 'warning':
      return warning;
    case 'information':
      return information;
    // Everything else
  default:
      return _default;
  }
}

async function filterSearch() {

  // read the value of the search input field
  const search = document.getElementById('inputSearch').value;
  
    // Get shows by calling showData.Search
    const shows = await showData.searchFilter(search);

    // If shows returned then display them
    if (Array.isArray(shows)) {
      displayShowList(shows);
    }

}

function actualClockTimes(search) {

  if (search == '17.00'){
  return true;
  }

  else if(search == '21.00'){
  return true;
  }

  else if(search == 'five'){
  return false;
  }
}

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

async function filterMovies() {

  // Get id of cat link (from the data attribute)
  // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  const movieId = Number(this.dataset.movie_id);
  console.log(movieId)

  // validation - if 0 or NaN reload everything
  if (isNaN(movieId) || movieId == 0) {
    loadAndDisplayData();
  
  // Otherwise get shows for this cinema
  } else {

    // Get shows
    const shows = await showData.getShowsByCinemaId(movieId);

    // If shows returned then display them
    if (Array.isArray(shows)) {
      displayShowList(shows);
    }
  }
}

async function toggleSortUser() {

  // read current sort order from session storage
  let sUser = JSON.parse(sessionStorage.getItem('bookedUser')) === true;
  console.log(sUser)
  // set session storage value to opposite
  sessionStorage.setItem('bookedUser', !sUser);

  // load shows - pass filter options as parameters
  const shows = await showData.getAllShows('numSeatBooked', !sUser);
  console.log("user found:", shows);
  displayShowList(shows);

}


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

  const movies = await movieData.getAllMovies();
  console.log("movies:", movies);
 

}

export { loadAndDisplayData, filterSearch, toggleSortUser };

// Add event listners to page elements
//document.getElementById('inputSearch').addEventListener('keypress', filterSearch);
document.getElementById('btnSearch').addEventListener('click', filterSearch);

document.getElementById('bookedSort').addEventListener('click', toggleSortUser)

// Initial data load
loadAndDisplayData();

const showsSub = showData.Supabase
  .from('show')
  .on('*', loadAndDisplayData)
  .subscribe();


