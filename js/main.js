$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    $('#searchForm').hide();
    $(".ptext").hide();
    $("#searchMovies").show();
    $("#bg-img").css({ background: '#000' });
    e.preventDefault(); // actually stop the form from submitting the file
  });
});

function getMovies(searchText) {
  // console.log(searchText);
  axios
    .get("http://www.omdbapi.com?s=" + searchText + "&apikey=thewdb") //searching by title
    .then(response => {
      console.log(response);
      let movies = response.data.Search; //since it's in data and search
      let output = "";
      var count = 0;
      $.each(movies, (index, movie) => {
        count += 1
        output += `
          <div class = "col-md-3">
            <div class = "well text-center">
              <img src = "${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick = "movieSelected('${
          movie.imdbID
          }')" class = "btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });
      // display content on the page
      $("#movies").html(`<div class = "container">
                      <p>${count} movies are found for '${searchText}'</p>
                      </div>`
        + output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  // Save data to sessionStorage
  // sessionStorage.setItem('key', value)
  sessionStorage.setItem("movieId", id);
  // redirect the browser to a new page.
  window.location = "movie.html";
  return false;
}

function getMovie() {
  // Get saved data from sessionStorage
  // var data = sessionStorage.getItem('key');
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=thewdb") // searching by id
    .then(response => {
      console.log(response);
      let movie = response.data;
      // we don't have to loop cause it's just one object it's not an array with all the movies
      let output = `
      <div class = "row">
        <div class = "col-md-4">
          <img src = "${movie.Poster}" class = "thumbnail">
        </div>

        <div class = "col-md-8">
          <h4>${movie.Title}</h4>
          <ul class = "list-group">
            <li class = "list-group-item"><strong>Genre:</strong>${
        movie.Genre
        }</li>
            <li class = "list-group-item"><strong>Released:</strong>${
        movie.Released
        }</li>
            <li class = "list-group-item"><strong>Rated:</strong>${
        movie.Rated
        }</li>
            <li class = "list-group-item"><strong>IMDB Rating:</strong>${
        movie.imdbRating
        }</li>
            <li class = "list-group-item"><strong>Director</strong>${
        movie.Director
        }</li>
            <li class = "list-group-item"><strong>Writer:</strong>${
        movie.Writer
        }</li>
            <li class = "list-group-item"><strong>Actors:</strong>${
        movie.Actors
        }</li>
          </ul>
        </div>
      </div>
      <div class = "row">
        <div class = "well">
          <h3>Plot</h3>
          ${movie.Plot}
          <hr>
          <a href = "http://imdb.com/title/${
        movie.imdbID
        }" target = "_blank" class = "btn btn-primary">View IMDB</a>
          <a href = "index.html" class = btn btn-default>Go Back to Search</a>
        </div>
      </div>
      `;
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
