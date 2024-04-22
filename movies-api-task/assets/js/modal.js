function modal() {
    const modal = document.querySelector('#modal');
    const modalClose = document.querySelector('#modalClose');

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
function openModal() {
    const loggedUser = localStorage.getItem("userId");
    if (loggedUser===null) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Not logged in",
            text: "Only logged users can watch trailer",
            showConfirmButton: false,
            timer: 1500,
          });
    }
    else{
        const modal = document.querySelector('#modal');
        modal.style.display = "block";
    }

}
modal();