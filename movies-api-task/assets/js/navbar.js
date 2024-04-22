import { getAll, deleteOne, getOne, update } from "./API/requests/index.js";
import { endpoints } from "./API/constants.js";
const userId = JSON.parse(localStorage.getItem("userId"));

const res = await getAll(endpoints.users);
const activeUser = res.data.find(user => user.id === userId);

const logOut = document.querySelector(".logout");

const usernameDisplay = document.querySelector(".username-display");
function renderHeader() {
  if (userId !== null) {
    if (activeUser.isAdmin === true) {
      console.log("is Admin");
      usernameDisplay.classList.remove("d-none", "d-block");
      usernameDisplay.children[0].textContent = activeUser.username;
      usernameDisplay.children[1].classList.replace("d-none", "d-block")
      logOut.classList.replace("d-none", "d-block");

    
    }
    else{
      usernameDisplay.classList.replace("d-none", "d-block");
      usernameDisplay.children[0].textContent = activeUser.username;
      usernameDisplay.children[1].classList.replace("d-block", "d-none")

      logOut.classList.replace("d-none", "d-block");
    }
  }
  else {
    usernameDisplay.classList.add("d-none");
    logOut.classList.remove("d-block");

    logOut.classList.add("d-none");
  }

}

renderHeader();
logOut.addEventListener("click", () => {
        
  Swal.fire({
    title: "Are you sure?",
    text: "You will need to log in again",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User logged out Successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.setItem("userId", null);
        window.location.replace('login.html');
        //recursion
        renderHeader();
      });
    }
  });
});
