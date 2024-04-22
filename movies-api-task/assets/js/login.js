
import { getAll, deleteOne, getOne, update } from "./API/requests/index.js";
import { endpoints } from "./API/constants.js";
const loginForm = document.querySelector("#login-form");
const userNameInp = document.querySelector("#user-name");
const passwordInp = document.querySelector("#user-password");
const rememberMe = document.querySelector("#remember-me");
const holdEyeIcon = document.getElementById("holdEye");

holdEyeIcon.addEventListener("mousedown", () => {
  holdEyeIcon.classList.remove("fa-eye-slash");
  holdEyeIcon.classList.add("fa-eye");
  passwordInp.type = "text";
});

holdEyeIcon.addEventListener("mouseup", () => {
  holdEyeIcon.classList.remove("fa-eye");
  holdEyeIcon.classList.add("fa-eye-slash");
  passwordInp.type = "password";
});

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userId = JSON.parse(localStorage.getItem("userId")) || null;
  console.log("user name: ", userNameInp.value);
  console.log("user password: ", passwordInp.value);

  let res = await getAll(endpoints.users);

  const user = res.data.find(user => user.username === userNameInp.value);

  if (!user) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "User not found",
      text: "Please enter a valid username",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (user.password !== passwordInp.value) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Incorrect password",
      text: "Please enter the correct password",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  localStorage.setItem("userId", user.id);

  if (rememberMe.checked) {
    localStorage.setItem("rememberMe", "true");
  } else {
    sessionStorage.setItem("rememberMe", "false");
  }

  window.location.replace('index.html'); // Moved inside the event listener
});


// Swal.fire({
//     position: "top-end",
//     icon: "error",
//     title: "username or password is incorrect!",
//     showConfirmButton: false,
//     timer: 1500,
//   })


