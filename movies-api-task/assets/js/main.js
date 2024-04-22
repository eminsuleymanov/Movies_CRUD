
import { getAll, deleteOne, getOne, update } from "./API/requests/index.js";
import { endpoints } from "./API/constants.js";

const moviesWrapper = document.querySelector(".movies-wrapper");
const editForm = document.querySelector("#edit-form");
const titleInp = document.querySelector("#title");
const posterInp = document.querySelector("#poster");
const trailerURLInp = document.querySelector("#trailerURL");
const genreInp = document.querySelector("#genre");
const ageInp = document.querySelector("#age");
const countryInp = document.querySelector("#country");
const directorInp = document.querySelector("#director");
const descTextArea = document.querySelector("#desc");


window.addEventListener("load", () => {
  // console.log('test');
  if (!localStorage.getItem("userId")) {
    localStorage.setItem("userId", null);
  }
  getAll(endpoints.movies).then((res) => {
    renderCards(res.data);
  });
});

function renderCards(arr) {
  moviesWrapper.innerHTML = "";
  arr.forEach((movie) => {
    moviesWrapper.innerHTML += `  <div class="col-lg-3 col-md-6 col-sm-12" data-id=${movie.id} data-editing="false">
        <div class="card">
            <div class="card-img">
                <img class="card-img-top"
                    src="${movie.poster}"
                    alt="${movie.title}">
                    title=${movie.title}
            </div>
            <div class="card-body">
                <marquee behavior="" direction="right"><h3 class="card-title">${movie.title}</h3></marquee>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-outline-secondary mb-0" onclick="openModal()">click for trailer</button> <br>
                    <div class="age-restriction">
                        <span>${movie.ageRestriction}+</span>
                    </div>
                </div>
                <hr>
     
                <a href="detail.html?id=${movie.id}" class="btn btn-outline-info info-btn">
                    <i class="fa-solid fa-circle-info"></i>
                </a>
                <button class="btn btn-outline-primary edit-btn"   data-bs-toggle="modal" data-bs-target="#editModal">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn btn-outline-danger delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    </div>`;
    //delete buttons
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.closest(".col-lg-3").getAttribute("data-id");
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await deleteOne(endpoints.movies, id);
            console.log("delete response: ", res);
            this.closest(".col-lg-3").remove();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      });
    });
    //edit buttons
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.closest(".col-lg-3").getAttribute("data-id");
        const response = await getOne(endpoints.movies, id);
        const movie = response.data[0];
        titleInp.value = movie.title;
        genreInp.value = movie.genre;
        posterInp.value = movie.poster;
        trailerURLInp.value = movie.trailerURL;
        ageInp.value = movie.ageRestriction;
        countryInp.value = movie.country;
        directorInp.value = movie.director;
        descTextArea.value = movie.description;

        this.closest('.col-lg-3').setAttribute('data-editing','true');
      });
    });
  });
}

editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const cards = document.querySelectorAll('.col-lg-3');
  let id;
  Array.from(cards).map((card)=>{
    if (card.getAttribute('data-editing')=='true') {
      id = card.getAttribute('data-id');
      card.setAttribute('data-editing','false');
    }
  });

  const updatedMovie = {
    title: titleInp.value, 
    genre: genreInp.value, 
    country: countryInp.value, 
    director: directorInp.value,
    ageRestriction: ageInp.value,
    poster: posterInp.value,
    trailerURL: trailerURLInp.value,
    description: descTextArea.value
  }
  update(endpoints.movies, id, updatedMovie).then(()=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Movie Updated Successfully!",
      showConfirmButton: false,
      timer: 1500
    });
    getAll(endpoints.movies).then((res)=>{
      renderCards(res.data);
    });
  })
});




//sort
const sortSelectOption =document.querySelector('.sort-by-name-select');
sortSelectOption.addEventListener('change', async (e) => {
  console.log('Sort option: ', e.target.value);
  let res = await getAll(endpoints.movies);
  let sortedArr;
  if (e.target.value == 'ascending') {
    sortedArr = [...res.data].sort((x, y) => x.title.localeCompare(y.title));
  } else if (e.target.value == 'descending') {
    sortedArr = [...res.data].sort((x, y) => y.title.localeCompare(x.title));
  }
  renderCards(sortedArr);
});


const search = document.querySelector('#search');
search.addEventListener("keyup", async function (e) {
  const searchValue = e.target.value.toLowerCase();
  let res = await getAll(endpoints.movies);
  const filteredData = res.data.filter(movie => {
    return movie.title.toLowerCase().includes(searchValue);
  });
  if (filteredData.length > 0) {
    renderCards(filteredData);
  } else {
    let error = document.createElement("h2")
    error.style.color = "red";
    error.textContent = "Movie Not Found"
    moviesWrapper.innerHTML = '';
    moviesWrapper.appendChild(error);
  }
});
