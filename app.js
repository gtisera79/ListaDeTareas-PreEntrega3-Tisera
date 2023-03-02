window.addEventListener('load', () => {
  //Windows object es un objeto global en JavaScript que representa la ventana o pestaña de navegación actual. El método window.addEventListener se utiliza para adjuntar un detector de eventos al evento de carga del objeto de la ventana. Esto significa que el código dentro de la función de devolución de llamada se ejecutará cuando la página haya terminado de cargarse.
  todos = JSON.parse(localStorage.getItem('todos')) || []; //Obtiene la matriz "todos" del almacenamiento local y la analiza desde una cadena JSON a un objeto JavaScript. Si no hay una matriz "todos" en el almacenamiento local, inicializa una matriz vacía.
  const nameInput = document.querySelector('#name'); //Encuentra el elemento de entrada con el ID "name" y lo almacena en la constante "nombreInput".
  const todoList = document.querySelector('#todo-list'); //Encuentra el elemento div con el ID "todo-list" y lo almacena en la constante "todoList".
  const newTodoForm = document.querySelector('#new-todo-form'); //Encuentra el elemento de formulario con el ID "new-todo-form" y lo almacena en la constante "newTodoForm".

  const username = localStorage.getItem('username') || ''; //Obtiene el valor de "username" del almacenamiento local. Si no hay un valor de "username" en el almacenamiento local, inicializa una cadena vacía.

  nameInput.value = username; //Establece el valor del elemento "nameInput" al valor de la variable "username"

  nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
  }); //Agrega un detector de eventos al elemento "nameInput", que escucha el evento "change" (cuando el usuario cambia el valor del campo de entrada) y establece el nombre de usuario en el almacenamiento local.

  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    }; //Agrega un detector de eventos al elemento "newTodoForm", que escucha el evento "submit" (cuando el usuario envía el formulario) y crea el objeto de tareas pendientes con cuatro propiedades: contenido, categoría, hecho y creado.

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
    e.target.reset();

    DisplayTodos();
  });
});

function DisplayTodos() {
  const todoList = document.querySelector('#todo-list'); //Encuentra el elemento div con el ID "todo-list" y lo almacena en la constante "todoList".

  todoList.innerHTML = '';

  todos.sort((a, b) => a.createdAt - b.createdAt); //ordenar por createdAt

  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deleteButton = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble');

    if (todo.category == 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('trabajo');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteButton.classList.add('delete');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = 'Editar';
    deleteButton.innerHTML = 'Borrar';

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add('done');
    }

    input.addEventListener('click', (e) => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }

      DisplayTodos();
    });
    edit.addEventListener('click', (e) => {
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      });
    });
    deleteButton.addEventListener('click', (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
