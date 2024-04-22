const isLogged = JSON.parse(localStorage.getItem("isLogged"));
function renderHeader() {
  if (isLogged==true) {
    const logOut = document.querySelector(".logout");
    logOut.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
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
            isLogged=false
            // localStorage.setItem("users", JSON.stringify(localUsers));
            // window.location.replace('login.html');
            //recursion
            renderHeader();
          });
        }
      });
    });
  }
}

renderHeader();
