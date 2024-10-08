// Функция для получения списка пользователей
async function fetchUserList() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Ошибка при получении данных');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Ошибка:', error);
        return [];
    }
}

// Обработчик события загрузки страницы
window.addEventListener('load', async () => {
    const userListElement = document.getElementById('user-list');
    
    // Получаем список пользователей
    const users = await fetchUserList();
    
    // Создаем элементы списка для каждого пользователя
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} (${user.email})`;
        userListElement.appendChild(listItem);
    });
});
