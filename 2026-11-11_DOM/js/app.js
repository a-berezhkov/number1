const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const cardsContainer = document.querySelector(".cards");
const deleteSelected = document.querySelector(".delete-selected");
const deleteAll = document.querySelector(".delete-all");

// ловим отправку формы (важно наличие тега form)

form.addEventListener("submit", (event) => {
  event.preventDefault(); // прерывает стандартное поведение (формы)
  // это объект события - на каком элементе и что за событие
  // console.log(event);
  // console.dir(input.value); значение из инпута

  if (input.value.trim() === "") {
    alert("Пустое поле!");
  }

  const card = createElementCard(input.value);
  cardsContainer.append(card);
});

function createElementCard(name) {
  const div = document.createElement("div");
  div.classList.add("card");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("card__checkbox");

  const title = document.createElement("div");
  title.innerText = name;

  const deleteButton = document.createElement("div");
  deleteButton.innerText = "Удалить";
  deleteButton.addEventListener("click", deleteCard);

  const editButton = document.createElement("div");
  editButton.innerText = "Изменить";
  editButton.addEventListener("click", () => {
    const newTitle = prompt("New name please", name); // см. доку по prompt и не надо в браузере VS code!
    // если есть название и оно не пустое (а если пустое то в newTitle  будет null)
    if (newTitle && newTitle.trim() !== "") {
      // если есть название и это название не состоит из пробелом то делаем
      title.innerText = newTitle; // меняем название из поля
    } else {
      alert("Либо только пробелы либо вы отказались");
    }
  });

  div.append(checkbox);
  div.append(title);
  div.append(deleteButton);
  div.append(editButton);

  // cardsContainer.append(div)

  return div;
}

function deleteCard(event) {
  //console.log(event.target); // элемент над которым произошло события (в нашем случае - событие клик над <div>Удалить</div>)

  if (confirm("Are you sure")) {
    const card = event.target.closest(".card"); // находим ближайшего родителя с классом .card
    card.remove(); // удаляем
  }
}

deleteSelected.addEventListener("click", () => {
  const selectedChecked = document.querySelectorAll(".card__checkbox:checked"); // Выбор checkbox с галочкой

  // проверить кол-во если 0 то ошибка

  if (confirm("Are you sure")) {
    selectedChecked.forEach((checkbox) => {
      const card = checkbox.closest(".card"); // находим ближайшего родителя с классом .card
      card.remove(); // удаляем
    });
  }
});

deleteAll.addEventListener("click", () => {
  cardsContainer.innerHTML = "";
});
