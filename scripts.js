const apiKey = '5d576382955ff5829fc3844390db4427';
const baseAPIUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
const baseAPIUrlGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`




    


$(function () {
    // After the DOM has loaded, call afterGoClicked after any time the button is clicked
    $('button').click(afterGoClicked);
    $('#movies').hide();
    
})

function afterGoClicked() {
    // Read the selected genre id from the select boxes and save it to a variable
    var genre = $('#genre').val();
    
    // Read the entered year from the text box and save it to a variable
    var year = $('#year').val();
    // Call buildQueryString to handle building a completeUrl
    var completeUrlApi = buildQueryString(baseAPIUrl, genre, year);
    // Load the JSON from the API with completeUrl, and then call the afterDataLoaded function
    $.getJSON(completeUrlApi, afterDataLoaded);
    $('#movies').show();
    
    }


/* Combine the baseUrl, genre, and year together to create a complete url with the
  right query parameters. Then return the url.

*/
function buildQueryString(baseAPIUrl, genre, year) {

    var queryUrl= baseAPIUrl + '&with_genre=' + genre + '&primary_release_year=' + year;
    return queryUrl;
}

// Call this function with the data object that comes back from getJSON
function afterDataLoaded(dataObject) {
    // All images have this base URL
    var posterBaseUrl = "https://image.tmdb.org/t/p/w500"

    /* Loop over the results in the dataObject. 
      HINT: use your debugger to find the name
      of the property that includes the array of results. 
    */

    /* For each result:
      - Look up a corresponding img element (in order)
      - Set the img element's src tag to posterBaseUrl + the poster_path from the result movie
     */
    for (var i = 0; i < dataObject.results.length; i++) {
        $('#movieImg' + i).attr('src', posterBaseUrl + dataObject.results[i].poster_path);       
    }

    //get results of movie description
    for(var i = 0; i < dataObject.results.length; i++){
      document.getElementById('card-' + i).innerHTML = dataObject.results[i].overview; 
    }
}