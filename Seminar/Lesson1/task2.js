// Задание 2 (тайминг 30 минут)
// Вы должны создать веб-страницу, которая позволяет пользователю динамически управлять элементами на странице. Ниже приведены основные требования и функциональность:
// 1. На странице должны быть кнопки "Добавить элемент", "Удалить элемент" и "Клонировать элемент".
// 2. При нажатии на кнопку "Добавить элемент" на страницу добавляется новый квадратный элемент (<div>) с размерами 100x100 пикселей. Этот элемент должен иметь класс .box и содержать текст, указывающий порядковый номер элемента (1, 2, 3 и так далее).
// 3. При нажатии на кнопку "Удалить элемент" удаляется последний добавленный элемент, если таковой имеется.
// 4. При нажатии на кнопку "Клонировать элемент" создается копия последнего добавленного элемента и добавляется на страницу.
// 5. Все элементы имеют класс .box и стилизованы с помощью CSS (см. пример).
// 6. Элементы могут быть добавлены, удалены и клонированы в любом порядке и в любом количестве.

// Находим контейнер для элементов и кнопки
const container = document.getElementById('container');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const cloneButton = document.getElementById('cloneButton');

// Функция для получения следующего номера для нового элемента
function getNextElementNumber() {
    // Найти максимальный номер среди существующих элементов
    const boxes = Array.from(container.children);
    const numbers = boxes.map(box => parseInt(box.textContent, 10));
    return Math.max(0, ...numbers) + 1; // Возвращаем следующий номер
}

// Функция для добавления нового элемента
addButton.addEventListener('click', () => {
    const newNumber = getNextElementNumber();
    const newElement = document.createElement('div');
    newElement.classList.add('box');
    newElement.textContent = newNumber;
    container.appendChild(newElement);
});

// Функция для удаления последнего элемента
removeButton.addEventListener('click', () => {
    if (container.children.length > 0) {
        container.removeChild(container.lastElementChild);
    }
});

// Функция для клонирования последнего элемента
cloneButton.addEventListener('click', () => {
    const lastElement = container.lastElementChild;
    if (lastElement) {
        const clonedElement = lastElement.cloneNode(true); // Полностью клонируем элемент, включая содержимое
        container.appendChild(clonedElement); // Добавляем клонированный элемент в контейнер
    }
});

