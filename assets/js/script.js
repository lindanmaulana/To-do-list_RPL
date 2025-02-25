let todo = [];

const handleSubmit = (e) => {
  e.preventDefault();
  const value = e.target.todo.value;

  if (value === "") {
    alert("Catatan baru tidak boleh kosong!");
    return;
  }

  todo = [...todo, { id: todo.length + 1, text: value }];
  renderTodo();
};

const renderTodo = () => {
  const listTodo = document.getElementById("list-todo");

  const element = todo
    .map(
      (list) =>
        `
         <li class="list__content__item">
                <p class="list__content__item__text">
                  ${list.text}
                </p>
                <div class="list__content__item__action">
                  <button class="list__content__item__action__el">
                    <img
                      src="./assets/images/check-square.svg"
                      alt="complete"
                      class=""
                    />
                  </button>
                  <button onclick="handleDelete(${list.id})" class="list__content__item__action__el btn-delete">
                    <img src="./assets/images/trash.svg" alt="trash" />
                  </button>
                </div>
        </li>`
    )
    .join(" ");

  listTodo.innerHTML = element;
};

const handleDelete = (id) => {
  todo = todo.filter((check) => {
    return check.id !== id;
  });

  renderTodo();
};
