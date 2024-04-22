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
    const modal = document.querySelector('#modal');
    modal.style.display = "block";
}
modal();