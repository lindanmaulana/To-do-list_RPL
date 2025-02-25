let todo = ["hello world"];

const handleSubmit = (e) => {
  e.preventDefault();
  const value = e.target.todo.value;

  if(value === "") {
    alert("Catatan baru tidak boleh kosong!")
    return;
  }

  todo.push(value);

  renderTodo();
};

const renderTodo = () => {
  const listTodo = document.getElementById("list-todo");

  listTodo.innerHTML = todo.map(
    (list) =>
      `
         <li class="list__content__item">
                <p class="list__content__item__text">
                  ${list}
                </p>
                <div class="list__content__item__action">
                  <button class="list__content__item__action__el">
                    <img
                      src="./assets/images/check-square.svg"
                      alt="complete"
                      class=""
                    />
                  </button>
                  <button class="list__content__item__action__el">
                    <img src="./assets/images/trash.svg" alt="trash" />
                  </button>
                </div>
        </li>`
  ).join(" ");
};
