console.log(navigator.userAgent); // userAgent — информация о браузере;
console.log(navigator.cookieEnabled); // cookieEnabled — включены ли coockie;
console.log(navigator.doNotTrack); // doNotTrack — включена ли опция запрета на отслеживание;
console.log(navigator.geolocation); // geolocation — геолокация, в данном случае не активированная.

function calculateDistance(location1, location2) {
	const [lat1, lon1] = location1; // Разбивает координаты 1 местоположения на широту и долготу
	const [lat2, lon2] = location2; // Разбивает координаты 2 местоположения на широту и долготу

	const toRad = (value) => (value * Math.PI) / 180; // Приобрету ли значение в радианы
	const R = 6371; // Радиус земли в километрах

	const dLat = toRad(lat2 - lat1); // Вычислять разницу широты в радианах
	const dLon = toRad(lon2 - lon1); // Вычислять разницу долготы в радианах
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Вычисляет квадрат синуса половины разницы широты
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2); // Вычисляет квадрат синуса половины разницы долготы и учитывает косинусы широты

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Вычисляет центральный угол между 2 местоположение
	const distance = R * c; // Вычисляет расстояние между 2 местоположение на сфере земли

	return distance; //Возвращает расстояние между местоположением кушаешь
}

function findFastestCity(cities) {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			// Проверять поддержку геолокации в браузере
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const userLocation = [
						position.coords.latitude,
						position.coords.longitude,
					]; // Получает текущий координаты пользователя
					let closestCity = null; // Переменная для хранения в близлежащего города
					let shortestDistance = Infinity; // Переменная для хранения кратчайшего расстояния

					cities.forEach((city) => {
						// Перебирать все города из массива cities
						const distance = calculateDistance(userLocation, city.location); // Вычисляет расстояние между местоположением пользователя и текущим городом
						if (distance < shortestDistance) {
							// Если расстояние меньше кратчайшего расстояния
							closestCity = city.name; // Записывать имя текущего города в closestCity
							shortestDistance = distance; // Записывать текущее расстояние в shortestDistance
						}
					});

					resolve(closestCity); // Возвращает ближайший город
				},
				(error) => {
					if (error.code === error.PERMISSION_DENIED) {
						// Если пользователь отказал в доступе к геолокации
						reject(new Error("Пользователь отказал в доступе к геолокации.")); // Возвращает ошибку
					} else {
						reject(new Error("Ошибка при получении местоположения.")); // Возвращает ошибку
					}
				}
			);
		} else {
			reject(new Error('Геолокация не поддерживается вашим браузером.')); // Возвращает ошибку
		}
	});
}

// Пример использования
const cities = [
	{ name: "Нью-Йорк", location: [40.7128, -74.006] },
	{ name: "Лондон", location: [51.5074, -0.1278] },
	{ name: "Усть-Каменогорск", location: [49.9714, 82.6059] },
	{ name: "Москва", location: [55.751244, 37.618423] },
	{ name: "Астана", location: [51.1048, 71.2645] },

];

findFastestCity(cities)
	.then((closestCity) => {
		console.log(closestCity); // Ожидаемый результат: название ближайшего города
	})
	.catch((error) => {
		console.log(error.message);
	});