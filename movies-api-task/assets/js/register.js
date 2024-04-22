
import { getAll,post } from "./API/requests/index.js";
import { endpoints } from "./API/constants.js";
const registerForm = document.querySelector("#register-form");

const userNameInp = document.querySelector("#user-name");
const userfullNameInp = document.querySelector("#user-full-name");
const userEmailInp = document.querySelector("#user-email");
const userPasswordInp = document.querySelector("#user-password");
const userConfirmPassInp = document.querySelector("#user-confirm-password");
const checkBox = document.querySelector("#isAdminCheckBox");
console.log(checkBox);
// console.log(checkBox.checked);
registerForm.addEventListener("submit", async(e) => {
  e.preventDefault();
  const allInputs = [userNameInp, userfullNameInp, userEmailInp, userPasswordInp, userConfirmPassInp];

  document.querySelectorAll('.error-message').forEach(span => span.remove());


  let res = await getAll(endpoints.users);

  const user = res.data.find(user => user.username.toLowerCase() === userNameInp.value.toLowerCase());
  if (user) {
    Swal.fire({
      icon: "error",
      title: "Username",
      text: "Username is already taken",
    });
    return;
  }
  // Validation for empty inputs
  const emptyInputs = validateInputs(allInputs);
  if (emptyInputs.length > 0) {
    emptyInputs.forEach(input => {
      const errorSpan = document.createElement('span');
      errorSpan.classList.add('error-message');
      errorSpan.style.color = "red"
      errorSpan.textContent = `${input.id} is required`;
      input.parentNode.insertBefore(errorSpan, input.nextSibling);
    });
    return;
  }
 
  // Validation for email
  if (!validateEmail(userEmailInp.value)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return;
  }

  //Validation for password
  if (!validatePassword(userPasswordInp.value)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Password",
      text:
        "Password must contain at least 5 characters, 1 uppercase letter, and 1 number",
    });
    return;
  }
  if (userPasswordInp.value !== userConfirmPassInp.value) {
    Swal.fire({
      icon: "error",
      title: "Passwords Don't Match",
      text: "Please make sure the passwords match",
    });
    return;
  }
  console.log(checkBox);

  //Post new user
  const newUser = {
    "username": userNameInp.value,
    "fullName": userfullNameInp.value,
    "email": userEmailInp.value,
    "password": userPasswordInp.value,
    "isAdmin": checkBox.checked,
    "favorites": []

  }


  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "User Signed Up successfully",
    showConfirmButton: false,
    timer: 1500,
  }).then(async() => {
    await post(endpoints.users, newUser);
    
    resetForm();
    
    window.location.replace("login.html");
  });

});



function validateEmail(email) {
  const re = new RegExp(/\S+@\S+\.\S+/);
  return re.test(email);
}

function validatePassword(password) {
  const re = new RegExp("^(?=.*[A-Z])(?=.*\\d).{5,}$");
  return re.test(password);
}
function validateInputs(inputs) {
  const emptyInputs = [];
  inputs.forEach(inp => {
    if (inp.value.trim() === "") {
      emptyInputs.push(inp);
    }
  });
  return emptyInputs;
}
function resetForm() {
  userNameInp.value = "";
  userEmailInp.value = "";
  userPasswordInp.value = "";
  userConfirmPassInp.value = "";
}