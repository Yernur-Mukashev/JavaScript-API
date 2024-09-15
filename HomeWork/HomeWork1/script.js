const activities = [
    { id: 1, title: "Йога", time: "10:00 - 11:00", maxParticipants: 10, currentParticipants: 5 },
    { id: 2, title: "Пилатес", time: "12:00 - 13:00", maxParticipants: 12, currentParticipants: 12 },
    { id: 3, title: "Кардиотренировка", time: "14:00 - 15:00", maxParticipants: 8, currentParticipants: 3 },
];

// Отображение всех занятий
function renderActivities() {
    const scheduleDiv = document.getElementById('schedule');
    scheduleDiv.innerHTML = '';

    activities.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'card activity-card';

        card.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">${activity.title}</h3>
                <p class="card-text">Время: ${activity.time}</p>
                <p class="card-text">Участники: ${activity.currentParticipants}/${activity.maxParticipants}</p>
                <button class="btn btn-primary" id="signup-${activity.id}" ${activity.currentParticipants >= activity.maxParticipants ? 'disabled' : ''}>Записаться</button>
                <button class="btn btn-danger" id="cancel-${activity.id}" ${activity.currentParticipants === 0 ? 'disabled' : ''}>Отменить запись</button>
            </div>
        `;

        scheduleDiv.appendChild(card);

        // Обработчики событий для кнопок
        document.getElementById(`signup-${activity.id}`).addEventListener('click', () => signUp(activity.id));
        document.getElementById(`cancel-${activity.id}`).addEventListener('click', () => cancelSignUp(activity.id));
    });
}

// Функция записи на занятие
function signUp(activityId) {
    const activity = activities.find(act => act.id === activityId);
    if (activity.currentParticipants < activity.maxParticipants) {
        activity.currentParticipants++;
        saveActivities();
        renderActivities();
    }
}

// Функция отмены записи
function cancelSignUp(activityId) {
    const activity = activities.find(act => act.id === activityId);
    if (activity.currentParticipants > 0) {
        activity.currentParticipants--;
        saveActivities();
        renderActivities();
    }
}

// Сохранение изменений в локальном хранилище
function saveActivities() {
    localStorage.setItem('activities', JSON.stringify(activities));
}

// Загрузка данных из локального хранилища
function loadActivities() {
    const savedActivities = JSON.parse(localStorage.getItem('activities'));
    if (savedActivities) {
        for (let i = 0; i < activities.length; i++) {
            activities[i].currentParticipants = savedActivities[i].currentParticipants;
        }
    }
}

// Инициализация
loadActivities();
renderActivities();
