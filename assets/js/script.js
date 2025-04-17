let todo = [];
let filter = ""

const handleModeTask = (id) => {
  const modes = {
    1: document.querySelector(".mode__all"),
    2: document.querySelector(".mode__pending"),
    3: document.querySelector(".mode__complete"),
  };

  Object.values(modes).forEach(el => el.classList.remove("modeActive"));

  if (modes[id]) {
    modes[id].classList.add("modeActive");
  }

  const filterMap = {
    1: "",
    2: "pending",
    3: "completed",
  };

  filter = filterMap[id] || "";

  renderTodo();
};


const handleSubmit = (e) => {
  e.preventDefault();
  const value = e.target.todo.value;

  if (value === "") {
    alert("Catatan baru tidak boleh kosong!");
    return;
  }

  todo = [...todo, { id: todo.length + 1, status: "pending", text: value }];

  e.target.reset();

  renderTodo()
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

let edit = {
  id: null,
  active: false
}

const handleEdit = (e, id) => {
  const value = e.target.value
  const taskText = document.getElementById("task__text")
  

  todo = todo.map((task) => {

    if(task.id === id) {
      return {
        ...task,
        text: value
      }
    } else {
      return {
        ...task
      }
    }
  })

  edit = {
    id: null,
    active: false
  }

  taskText.classList.remove("editable")
  renderTodo()
}

const handleTaskEdit = (id) => {
  edit = {
    id: id,
    active: true
  }

  renderTodo()
}


const renderTodo = () => {
  const listTodo = document.getElementById("list-todo");
  const tasks = filter ? todo.filter(task => task.status === filter) : todo;

  let element = tasks.length > 0 ? tasks.map(
      (list) =>
        ` 
         <li class="list__content__item">
                <textarea id="task__text" type="text" class="list__content__item__text" name="task" onchange="handleEdit(event, ${list.id})" ${edit.id === list.id && edit.active === true ? "" :  "readonly" }>${list.text}</textarea>
                <div class="list__content__item__action">
                ${
                  list.status !== "completed"
                    ? ` <button onclick="handleTaskEdit(${list.id})" class="list__content__item__action__el btn-complete">
                            <img
                                src="./assets/images/edit.svg"
                                alt="complete"
                                class=""
                            />
                        </button>
                        <button onclick="handleCompleted(${list.id})" class="list__content__item__action__el btn-complete">
                            <img
                                src="./assets/images/check-square.svg"
                                alt="complete"
                                class=""
                            />
                        </button>
                        <button onclick="handleDelete(${list.id})" class="list__content__item__action__el btn-delete">
                            <img src="./assets/images/trash.svg" alt="trash" />
                        </button>`
                    : 
                    `   <button onclick="handleDelete(${list.id})" class="list__content__item__action__el btn-delete">
                            <img src="./assets/images/trash.svg" alt="trash" />
                        </button>
                    `
                }
                </div>
        </li>`
    )
    .join(" ") : ` <li class="list__content__item notfound">
                <p class="list__content__item__text text__notfound">Catatan kosong</p>
                <img
                class="list__content__item__notfound"
                  src="./assets/images/xmark.svg"
                  alt="xmark"
                  width="25"
                  height="25"
                />
              </li>`;
  

    setTimeout(() => {
      const activeTextarea = document.querySelector("textarea:not([readonly])");
      if (activeTextarea) {
        activeTextarea.focus();
        activeTextarea.classList.add("editable")
      }
    }, 0);

  listTodo.innerHTML = element;
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