function modal() {
    const btn = document.querySelectorAll('.description-btn, .more');
    // const more = document.querySelector('.more');
    const overlay = document.querySelector('.overlay');
    const close = document.querySelector('.popup-close');
    let statusMessage = document.createElement('div');

    function showModal(button) {
        button.addEventListener('click', () => {
            overlay.style.display = 'block';
            button.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    }
    btn.forEach(showModal);

    function closeModal(button) {
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            button.classList.remove('more-splash');
            document.body.style.overflow = '';
            statusMessage.classList.remove('sttus');
        });
    }

    btn.forEach(closeModal);
}

module.exports = modal;