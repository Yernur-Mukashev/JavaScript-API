// Получаем элементы
const finishBtn = document.querySelector('.finish-btn');
const errorElement = document.querySelector('.error');
const resultsElement = document.querySelector('.results');

// Добавляем обработчик клика на кнопку "Завершить опрос"
finishBtn.addEventListener('click', function () {
    // Собираем ответы пользователя
    const answers = {
        question1: document.querySelector('input[name="question1"]:checked'),
        question2: document.querySelector('input[name="question2"]:checked'),
        question3: document.querySelector('input[name="question3"]:checked')
    };

    // Проверяем, ответил ли пользователь на все вопросы
    if (!answers.question1 || !answers.question2 || !answers.question3) {
        // Если есть незаполненные вопросы, показываем сообщение об ошибке
        errorElement.style.display = 'block';
        resultsElement.style.display = 'none';
    } else {
        // Если все вопросы заполнены, скрываем ошибку и показываем результаты
        errorElement.style.display = 'none';

        // Отображаем результаты
        resultsElement.innerHTML = `
            <h3>Ваши ответы:</h3>
            <p>1. Любимый цвет: <strong>${answers.question1.value}</strong></p>
            <p>2. Любимое животное: <strong>${answers.question2.value}</strong></p>
            <p>3. Любимое время года: <strong>${answers.question3.value}</strong></p>
        `;
        resultsElement.style.display = 'block';
    }
});