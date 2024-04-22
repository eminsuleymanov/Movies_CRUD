
import { getAll } from "./API/requests/index.js";
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
console.log(res.data)
  const user = res.data.find(user => user.username == userNameInp.value && passwordInp.value == user.password);
  console.log(user);
  if ((!user)) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Incorrect username or password",
      text: "Please enter a valid username",
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
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "User Logged In successfully",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    window.location.replace('index.html');
  });
});



