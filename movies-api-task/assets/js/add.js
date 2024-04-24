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
const dropZone = document.querySelector(".drop-zone");
const poster = document.querySelector("input[type=file]");
poster.addEventListener('change', async () => {
    // const name = poster.name;
    const file = poster.files[0]
    const size = Math.round(file.size / 1024);
    const type = file.type;
    if (!type.includes("image/")) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "File Type need to be an image",
            showConfirmButton: false,
            timer: 1500,
        });
    } else if (size > 3000) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "File Size must be under 3MB",
            showConfirmButton: false,
            timer: 1500,
        }).then(()=>{
            poster.value = '';
        });
    } else {
        const reader = new FileReader();

        const toBase64 = file => new Promise((resolve, reject) => {
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });
        const base64String = await toBase64(file);
        // console.log(base64String);
        reader.onloadend = function () {
            dropZone.style.backgroundImage = `url("${base64String}")`;
            dropZone.style.backgroundPosition = 'center';
            dropZone.style.backgroundSize = 'contain';
            dropZone.innerHTML = '';
            dropZone.dataset.base64 = base64String;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "File Added",
                showConfirmButton: false,
                timer: 1000,
            });
        };
    }

})

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let title = document.getElementById("titleInput").value;
    let base64String = dropZone.dataset.base64;
    let trailerUrl = document.getElementById("trailerUrlInput").value;
    let genre = document.getElementById("genreInput").value;
    let description = document.getElementById("descriptionInput").value;
    let ageRestriction = document.getElementById("ageRestrictionInput").value;
    let country = document.getElementById("countryInput").value;
    let director = document.getElementById("directorInput").value;

    post(endpoints.movies, new Movie(
        title, base64String, trailerUrl, genre, description, Number(ageRestriction), country, director
    ))
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Movie added",
        showConfirmButton: false,
        timer: 1500,
    }).then(() => {
        title = '';
        dropZone.dataset.base64 = '';
        trailerUrl = '';
        genre = '';
        description = '';
        ageRestriction = '';
        country = '';
        director = '';
        window.location.replace("index.html");
    })


});
