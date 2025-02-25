let todo = [];

const handleSubmit = (e) => {
  e.preventDefault();
  const value = e.target.todo.value;

  if (value === "") {
    alert("Catatan baru tidak boleh kosong!");
    return;
  }

  todo = [...todo, { id: todo.length + 1, status: "pending", text: value }];

  e.target.reset();

  renderTodo();
};

const renderTodo = () => {
  const listTodo = document.getElementById("list-todo");
  console.log(todo);
  const element = todo
    .map(
      (list) =>
        `
         <li class="list__content__item">
                <p class="list__content__item__text">
                  ${list.text}
                </p>
                <div class="list__content__item__action">
                ${
                  list.status !== "completed"
                    ? `<button onclick="handleCompleted(${list.id})" class="list__content__item__action__el btn-complete">
                      <img
                        src="./assets/images/check-square.svg"
                        alt="complete"
                        class=""
                      />
                    </button>
                    <button onclick="handleDelete(${list.id})" class="list__content__item__action__el btn-delete">
                      <img src="./assets/images/trash.svg" alt="trash" />
                    </button>`
                    : `<button onclick="handleDelete(${list.id})" class="list__content__item__action__el btn-delete">
                    <img src="./assets/images/trash.svg" alt="trash" />
                  </button>`
                }
                </div>
        </li>`
    )
    .join(" ");

  listTodo.innerHTML = element;
};

const handleCompleted = (id) => {
  todo = todo.map((check) => {
    if (check.id === id) {
      return {
        ...check,
        status: "completed",
      };
    } else {
      return check;
    }
  });

  renderTodo();
};

const handleDelete = (id) => {
  todo = todo.filter((check) => {
    return check.id !== id;
  });

  renderTodo();
};

let isNightMode = false;
const handleMode = () => {
  isNightMode = !isNightMode;

  switchIconMode();
};

const switchIconMode = () => {
  const iconMode = document.getElementById("icon__mode");

  if (iconMode) {
    if (isNightMode) {
      iconMode.src = "./assets/images/light.svg";
      document.querySelector(".todo").style.backgroundColor = "black";
    } else {
      iconMode.src = "./assets/images/night.svg";
      document.querySelector(".todo").style.backgroundColor = "#2361cc";
    }
  }
};
