// Задание 3 (тайминг 50 минут)
// 1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и текста. Вам необходимо использовать Bootstrap для стилизации элементов.
// 2. Используйте Bootstrap, чтобы стилизовать элементы:
// a. Заголовок статьи (<h2>)
// b. Текст статьи (<p>)
// c. Кнопки "Добавить статью", "Удалить" и "Редактировать".
// 3. Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте JSON-данные для определения заголовков и текстов статей.
// 4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
// 5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая статья должна быть удалена из списка.
// 6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать" пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте всплывающее окно или prompt для ввода новых данных.
// 7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное хранилище браузера, чтобы они сохранялись после перезагрузки страницы.


// Начальные данные (в формате JSON)
const initialArticles = [
    { id: 1, title: "Статья 1", content: "Содержание первой статьи." },
    { id: 2, title: "Статья 2", content: "Содержание второй статьи." }
];

// Загрузка статей из локального хранилища или использование начальных данных
function loadArticles() {
    const articles = JSON.parse(localStorage.getItem('articles')) || initialArticles;
    return articles;
}

// Сохранение статей в локальное хранилище
function saveArticles(articles) {
    localStorage.setItem('articles', JSON.stringify(articles));
}

// Отображение статей на странице
function renderArticles() {
    const articles = loadArticles();
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        articleDiv.innerHTML = `
            <h2 class="article-header">${article.title}</h2>
            <p>${article.content}</p>
            <button class="btn btn-info btn-sm edit-btn" data-id="${article.id}">Редактировать</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${article.id}">Удалить</button>
        `;
        container.appendChild(articleDiv);
    });

    attachEventListeners();
}

// Добавление обработчиков событий для кнопок
function attachEventListeners() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', editArticle);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteArticle);
    });
}

// Добавление новой статьи
document.getElementById('addArticle').addEventListener('click', () => {
    const articles = loadArticles();
    const newArticle = {
        id: articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1,
        title: 'Новая статья',
        content: 'Введите содержание статьи...'
    };
    articles.push(newArticle);
    saveArticles(articles);
    renderArticles();
});

// Редактирование статьи
function editArticle(event) {
    const articleId = parseInt(event.target.dataset.id);
    const articles = loadArticles();
    const article = articles.find(a => a.id === articleId);

    const newTitle = prompt('Введите новый заголовок:', article.title);
    const newContent = prompt('Введите новый текст статьи:', article.content);

    if (newTitle !== null && newContent !== null) {
        article.title = newTitle;
        article.content = newContent;
        saveArticles(articles);
        renderArticles();
    }
}

// Удаление статьи
function deleteArticle(event) {
    const articleId = parseInt(event.target.dataset.id);
    let articles = loadArticles();
    articles = articles.filter(a => a.id !== articleId);
    saveArticles(articles);
    renderArticles();
}

// Начальная отрисовка статей
renderArticles();
