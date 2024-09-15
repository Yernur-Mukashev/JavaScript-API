const backButton = document.querySelector('.backButton');
const forwardButton = document.querySelector('.forwardButton');

backButton.addEventListener('click', () => {
    window.history.back(); // по истории переходит назад
});

forwardButton.addEventListener('click', () => {
    window.history.forward(); // по истории переходит вперед
});