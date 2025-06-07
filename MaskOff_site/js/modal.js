// Registration Modal
const regModal = document.getElementById('registrationModal');
const registerBtns = document.querySelectorAll('.register-btn');
const closeRegModal = document.querySelector('#registrationModal .close-modal');
const eventNameInput = document.getElementById('eventName');

registerBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const eventName = this.getAttribute('data-event');
        eventNameInput.value = eventName;
        document.getElementById('game').value = eventName.includes('покер') ? 'Покер' :
                                              eventName.includes('мафия') ? 'Мафия' : 'Бункер';
        regModal.style.display = 'flex';
    });
});

closeRegModal.addEventListener('click', function() {
    regModal.style.display = 'none';
});

// Auth Modal
const authModal = document.getElementById('authModal');
const authLink = document.getElementById('authLink');
const profileNavItem = document.getElementById('profileNavItem');
const closeAuthModal = document.querySelector('#authModal .close-modal');
const mainContent = document.getElementById('mainContent');
const profilePage = document.getElementById('profilePage');
const backButton = document.getElementById('backButton');

authLink.addEventListener('click', function(e) {
    e.preventDefault();
    authModal.style.display = 'flex';
});

backButton.addEventListener('click', function(e) {
    e.preventDefault();
    profilePage.style.display = 'none';
    mainContent.style.display = 'block';
    window.scrollTo(0, 0);
});

closeAuthModal.addEventListener('click', function() {
    authModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === regModal) {
        regModal.style.display = 'none';
    }
    if (e.target === authModal) {
        authModal.style.display = 'none';
}