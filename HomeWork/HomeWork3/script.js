const ACCESS_KEY = "jlw6OXEblJez5P_LdaTgL6165ofgcjmb71u2XQJZix8";

const photoContainer = document.getElementById("photo-container");
const photoElement = document.getElementById("photo");
const photographerElement = document.getElementById("photographer");
const likeButton = document.getElementById("like-button");
const likeCounter = document.getElementById("like-counter");

// Функция для получения случайного изображения из Unsplash
async function fetchRandomPhoto() {
	try {
		const response = await fetch(
			`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`
		);
		const data = await response.json();

		// Отображаем изображение и информацию о фотографе
		photoElement.src = data.urls.regular;
		photographerElement.textContent = `Фото от: ${data.user.name}`;

		// Сохраняем текущую фотографию в истории
		savePhotoToHistory(data.urls.regular, data.user.name);
	} catch (error) {
		console.error("Ошибка при получении изображения:", error);
	}
}

// Функция увеличения счетчика лайков
function increaseLikeCounter() {
	let currentLikes = parseInt(localStorage.getItem("likeCount") || 0);
	currentLikes += 1;
	localStorage.setItem("likeCount", currentLikes);
	likeCounter.textContent = currentLikes;
}

// Функция сохранения фото в историю
function savePhotoToHistory(url, photographer) {
	const history = JSON.parse(localStorage.getItem("photoHistory")) || [];
	history.push({ url, photographer, date: new Date() });
	localStorage.setItem("photoHistory", JSON.stringify(history));
}

// Загрузка количества лайков из локального хранилища
function loadLikeCounter() {
	const savedLikes = localStorage.getItem("likeCount") || 0;
	likeCounter.textContent = savedLikes;
}

// Загрузка случайного изображения при загрузке страницы
window.addEventListener("load", () => {
	fetchRandomPhoto();
	loadLikeCounter();
});

// Обработчик события "лайк"
likeButton.addEventListener("click", increaseLikeCounter);
