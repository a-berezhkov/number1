const form = document.querySelector(".form");
const name = document.querySelector(".form__name");
const description = document.querySelector(".form__description");
const price = document.querySelector(".form__price");

const cardsContainer = document.querySelector(".cards");

const url = "http://localhost:3001/api/items";

loadCardsAPI().then((cards) => {
  cards.forEach((card) => draw(card));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValue = name.value;
  const descValue = description.value;
  const priceValue = price.value;

  const result = createCardAPI(nameValue, descValue, priceValue); // Promise
  result.then((data) => {
    draw(data);
  });
});

function draw(card) {
  const div = document.createElement("div");
  div.className = "card";

  div.dataset.id = card.id;
  div.dataset.createdAt = card.createdAt; // пример формирования атрибута data-*

  const h2 = document.createElement("h2");
  h2.innerText = card.name;

  const p = document.createElement("p");
  p.innerText = card.description;

  const priceDiv = document.createElement("div");
  priceDiv.innerText = card.price;

  const deleteDiv = document.createElement("div");
  deleteDiv.innerText = "X";

  deleteDiv.addEventListener("click", () => {
    if (!confirm("Delete this?")) { // Да - true Нет - false -> !false 
      return;
    }

    const id = deleteDiv.closest(".card").dataset.id;

    deleteCardAPI(id).then((success) => {
      if (success) {
        deleteDiv.closest(".card").remove();
      } else {
        alert("Error");
      }
    });
  });

  div.append(h2);
  div.append(p);
  div.append(priceDiv);
  div.append(deleteDiv);

  cardsContainer.append(div);
}

function createCardAPI(name, description = "", price = "") {
  const query = fetch(url, {
    // query<Promise>
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      price,
    }),
  });

  return query.then((res) => res.json()); // <Promise> возвращает промис - что-то асинхронное =)
  // .then((data) => {... })
}

function deleteCardAPI(id) {
  const query = fetch(url + `/${id}`, {
    // /api/items/:id`
    method: "DELETE",
  });

  return query.then((res) => res.status === 200);
}

function loadCardsAPI() {
  const query = fetch(url);
  return query.then((res) => res.json());
}
