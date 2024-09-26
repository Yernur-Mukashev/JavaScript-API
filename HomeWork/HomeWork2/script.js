const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const dots = document.querySelectorAll(".nav-dot");

let currentIndex = 0;
const totalImages = images.length;

// Функция для показа изображения по индексу
function showImage(index) {
	slides.style.transform = `translateX(${-index * 100}%)`;

	// Обновляем активные индикаторы
	dots.forEach((dot) => dot.classList.remove("active"));
	dots[index].classList.add("active");
}

// Переход к следующему изображению
nextBtn.addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % totalImages;
	showImage(currentIndex);
});

// Переход к предыдущему изображению
prevBtn.addEventListener("click", () => {
	currentIndex = (currentIndex - 1 + totalImages) % totalImages;
	showImage(currentIndex);
});

// Навигация по индикаторам
dots.forEach((dot) => {
	dot.addEventListener("click", () => {
		const index = parseInt(dot.getAttribute("data-index"));
		currentIndex = index;
		showImage(currentIndex);
	});
});
