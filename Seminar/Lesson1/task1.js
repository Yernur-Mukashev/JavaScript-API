// Задание 1 (тайминг 30 минут)
// Работа с BOM
// 1. Определение текущего размера окна браузера: Напишите функцию, которая будет выводить текущую
// ширину и высоту окна браузера при его изменении.
// 2. Подтверждение закрытия страницы: Создайте всплывающее окно или диалоговое окно, которое появляется при попытке закрыть вкладку браузера и спрашивает пользователя, уверен ли он в своем решении закрыть страницу.
// 3. Управление историей переходов: ○ Используйте объект history для управления историей переходов на веб-странице. Создайте кнопки "Назад" и "Вперед" для перемещения по истории.

// Определение текущего размера окна на страницу
function updateWindowSize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	document.getElementById("width").textContent = `${width}`;
	document.getElementById("height").textContent = `${height}`;
}

// Добавляем обработчик события resize
window.addEventListener("resize", updateWindowSize);

// Вызываем функцию сразу при загрузке страницы
updateWindowSize();

// // Определение текущего размера окна в консоль
// function logWindowSize() {
//     console.log(`Ширина: ${window.innerWidth}, Высота: ${window.innerHeight}`);
// }

// window.addEventListener('resize', logWindowSize);

// // Выводим размеры окна при загрузке страницы
// logWindowSize();

////-----------------------------------//////////
// 2. Подтверждение закрытия страницы: Создайте всплывающее окно или диалоговое окно, которое появляется при попытке закрыть вкладку
// браузера и спрашивает пользователя, уверен ли он в своем решении закрыть страницу.

window.addEventListener("beforeunload", function (e) {
	e.preventDefault();
	e.returnValue = ""; // Это необходимо для отображения стандартного диалога
});

//// -------------------------  //////////
// 3. Управление историей переходов: Используйте объект history для управления историей переходов на веб-странице. Создайте кнопки "Назад" и "Вперед" для перемещения по истории.
const backButton = document.querySelector(".backButton");
const forwardButton = document.querySelector(".forwardButton");

backButton.addEventListener("click", () => {
	window.history.back(); // по истории переходит назад
});

forwardButton.addEventListener("click", () => {
	window.history.forward(); // по истории переходит вперед
});
