// На странице есть список элементов, каждый из которых имеет атрибут data-price, Содержащий цену товара. Создайте функцию, которая принимает максимальную цену и скрывать все элементы с ценой выше указаны значения.

const filterElementsByDataAttribute = (attributeName, maxPrice) => {
    const elements = Array.from(document.querySelectorAll(`[${attributeName}]`));
    elements.forEach(element => {
        const price = parseFloat(element.getAttribute(attributeName));
        if (price > maxPrice) {
            element.style.display = 'none';
        }
    });
};

// Пример использования:
filterElementsByDataAttribute('data-price', 50);

// На странице есть список элементов, каждый из которых имеет атрибут data-rating, Содержащий рейтинг товара. Создайте функцию, которая сортирует элементы в порядке убывание рейтинга и переставляет их на странице в соответствии с новым порядком.

const sortElementsByDataAttribute = attributeName => {
    const rating = document.querySelector('.rating');
    const elements = Array.from(rating.querySelectorAll(`[${attributeName}]`));
    elements.sort((a, b) => {
        const ratingA = parseInt(a.getAttribute(attributeName));
        const ratingB = parseInt(b.getAttribute(attributeName));
        return ratingB -ratingA;
    });
    elements.forEach(element => {
        rating.appendChild(element);
    });
};

// Пример использования:
sortElementsByDataAttribute('data-rating')