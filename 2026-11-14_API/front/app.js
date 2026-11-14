const form = document.querySelector(".form");
const name = document.querySelector(".name");
const description = document.querySelector(".description");
const price = document.querySelector(".price");

const container = document.querySelector(".cards");

const url = "http://localhost:3000/api/items";


initialLoading()

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {
    name: name.value,
    description: description.value,
    price: price.value,
  };

  const query = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj), // JSON.stringify - преобразует объект в строку
  });

  query.then((res) => res.json()).then((data) => drawCard(data));
});
//  {
//     "id": 62,
//     "name": "123",
//     "description": "123",
//     "price": "123",
//     "updatedAt": "2026-11-14T11:06:03.443Z",
//     "createdAt": "2026-11-14T11:06:03.443Z"
// }

function drawCard(card) {
  const div = document.createElement("div");

  const divName = document.createElement("div");
  divName.innerText = card.name;

  const divDesc = document.createElement("div");
  divDesc.innerText = card.description;

  const divPrice = document.createElement("div");
  divPrice.innerText = card.price;

  div.append(divName);
  div.append(divDesc);
  div.append(divPrice);

  container.append(div);
}

function initialLoading() {


  const result = fetch(url, {
    method: "GET",
  });
  // Обработка GET запроса
  result
    .then((response) => response.json()) // читает ответ от сервера
    .then((allCardsArray) => {
       allCardsArray.map(card => drawCard(card) )

      // data - данные от сервера что -то с ними делаем
    });
}

// // Пример как делать GET зарос
// const result = fetch(url, {
//   method: "GET",
// });
// // Обработка GET запроса
// result
//   .then((response) => response.json()) // читает ответ от сервера
//   .then((data) => {
//     console.log("GET all", data);

//     // data - данные от сервера что -то с ними делаем
//   });

// // Пример как делать GET зарос с ID
// const oneRecord = fetch(url + "/1", {
//   method: "GET",
// });

// oneRecord
//   .then((res) => res.json())
//   .then((obj) => {
//     console.log("GET ONE", obj);
//   });

// // DELETE /api/items/:id - Удалить элемент - что вернет бекенд на запрос
// // DELETE /api/items - Удалить все элементы -  что вернет бекенд на запрос
// // PUT (POST + DELETE) /api/items/:id - Обновить элемент
