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

const renderCodeHtml = () => {
  const codeHtml = document.getElementById("code-html")

  codeHtml.textContent = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todolist</title>
    <link rel="stylesheet" href="./assets/css/style.css" />
  </head>
  <body>
    <header>
      <h1 class="header__name">Dika Ramdhanika</h1>
      <button onclick="handleMode()" class="btn__mode">
        <img
          id="icon__mode"
          src="./assets/images/night.svg"
          alt="night-mode"
          width="40"
          height="32"
        /> 
      </button>
    </header>
    <main> 
      <section class="todo">
        <div class="container">
          <h2 class="title">To-Do-List</h2>
          <div class="todo__content">
            <form onsubmit="handleSubmit(event)" class="todo__content__form">
              <input
                type="text"
                placeholder="Tambah catatan baru..."
                class="todo__content__form__input"
                name="todo"
              />
              <button type="submit" class="todo__content__form__action">
                Add
              </button>
            </form>
            <div class="todo__content__action">
              <button onclick="handleModeTask(1)" class="todo__content__action__all mode__all modeActive">All</button>
              <button onclick="handleModeTask(2)" class="todo__content__action__pending mode__pending">Pending</button>
              <button onclick="handleModeTask(3)" class="todo__content__action__complete mode__complete">Complete</button>
            </div>
            <ul class="list__content" id="list-todo">
              <li class="list__content__item notfound">
                <p class="list__content__item__text text__notfound">Catatan kosong</p>
                <img
                class="list__content__item__notfound"
                  src="./assets/images/xmark.svg"
                  alt="xmark"
                  width="25"
                  height="25"
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
      <script type="text/javascript" src="./assets/js/script.js"></script>
    </body>
    </html>
  `
}

const renderCodeCss = () => {
  const codeCss = document.getElementById("code-css")
  codeCss.textContent = `
    /* css reset start */
*,body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


/* css reset end */

:root {
  --primary: #2361cc;
  --secondary: #c5e0e5;
  --third: #1d1ba3;
}

header {
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.header__name {
  font-size: 25px;
  color: white;
}

.todo {
  width: 100%;
  height: 100dvh;
  background-color: var(--primary);
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.title {
  color: white;
}

.btn__hidden {
  display: none;
}

.btn__mode {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.btn__night__mode {
  background-color: black;
}

.btn__night__light {
  background-color: black;
}

.todo__content {
  min-width: 380px;
  background-color: white;
  padding: 30px 20px;
  border-radius: 6px;
}

.todo__content__form {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.todo__content__form__input {
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  border-radius: 4px;
  outline: none;
  border: 1px solid var(--primary);
}

.todo__content__form__input:focus {
  border: 2px solid var(--primary);
}

.todo__content__form__action {
  width: 25%;
  height: 40px;
  background-color: var(--primary);
  border-radius: 4px;
  color: white;
  outline: none;
  border: none;
  padding: 5px 10px;
}

/* todo-content-action start */
.todo__content__action {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 3px;
  margin-bottom: 30px;
}

.todo__content__action button {
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 3px;
  border: none;
}

.modeActive {
  background-color: green;
  color: white;
  box-shadow: 2px 2px 2px 1px black;
}
/* todo-content-action end */

/* list content start */
.list__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.list__content__item {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--secondary);
  list-style-type: none;
  border-radius: 4px;
  padding: 6px;
}

.notfound {
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
}

.list__content__item__text {
  width: 100%;
  outline: none;
  padding: 0px 2px;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  max-width: 200px;
  overflow-y: auto; 
  border: none;
  background-color: transparent;
}
.editable {
  border: 2px solid red;
}

.text__notfound {
  display: flex;
  align-items: center;
}

.list__content__item__action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.list__content__item__action__el {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--third);
  border-radius: 3px;
  padding: 6px 8px;
  border: none;
  color: white;
}

.btn-complete {
  background-color: green;
}

.btn-delete {
  background-color: red;
}

.list__content__item__action__el img {
  width: 18px;
  height: 18px;
}
  `
}

renderCodeHtml()
renderCodeCss()