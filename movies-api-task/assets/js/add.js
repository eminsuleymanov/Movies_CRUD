import { post } from "./API/requests/index.js";
import { endpoints } from "./API/constants.js";

class Movie {
    constructor(title, poster, trailerUrl, genre, description, ageRestriction, country, director) {
        this.title = title;
        this.poster = poster;
        const trailerEmbedURL = trailerUrl.slice(trailerUrl.indexOf("youtu.be/") + 9)
        this.trailerUrl = trailerEmbedURL;
        this.genre = genre;
        this.description = description;
        this.ageRestriction = ageRestriction;
        this.country = country;
        this.director = director;
    }
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.getElementById("titleInput").value;
    const poster = document.getElementById("posterInput").value;
    const trailerUrl = document.getElementById("trailerUrlInput").value;
    const genre = document.getElementById("genreInput").value;
    const description = document.getElementById("descriptionInput").value;
    const ageRestriction = document.getElementById("ageRestrictionInput").value;
    const country = document.getElementById("countryInput").value;
    const director = document.getElementById("directorInput").value;

    post(endpoints.movies, new Movie(
        title, poster, trailerUrl, genre, description, Number(ageRestriction), country, director
    ))
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Movie added",
        showConfirmButton: false,
        timer: 1500,
    }).then(() => {
        title = '';
        poster = '';
        trailerUrl = '';
        genre = '';
        description = '';
        ageRestriction = '';
        country = '';
        director = '';
        window.location.replace("index.html");
    })
    title = '';

});
