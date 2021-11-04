class Model {
  // The state of the model, an array of todo objects, prepopulated with some data
  constructor() {
    this.todos = [
      {id: 1, text: 'Run a marathon', complete: false},
      {id: 2, text: 'Plant a garden', complete: false},
    ]
  }

  addTodo(todoText) {
    const todo = {
      id: (() => {
        if (this.todos.length > 0) {
          return this.todos[this.todos.length - 1].id + 1;
        } else {
          return 1;
        }
      })(),

      text: todoText,
      complete: false,
    }

    this.todos.push(todo);
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map(todo => {
      return todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo;
    });
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => {
      return todo.id !== id;
    });
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo => {
      return todo.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo;
    });
  }
}

class View {
  constructor() {
    // Obtaining the `#root` element (this is a div)
    this.app = this.getElement('#root');

    // Creating the title and setting its text
    this.title = this.createElement('h1');
    this.title.textContent = 'Todos';

    // Creating a form
    this.form = this.createElement('form');
    
    // Creating the input element, setting its type, placeholder, and name attributes
    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add todo';
    this.input.name = 'todo';

    // Creating a button element and setting its text
    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';

    // Creating an unordered list element and setting its class attribute
    this.todoList = this.createElement('ul', 'todo-list');

    // Appending the input and button elements to the form
    this.form.append(this.input, this.submitButton);
    // Appending the title, form, and unordered list elements to the `#root` element (this is a div)
    this.app.append(this.title, this.form, this.todoList);

    // Define template as View property
    this.listItemTemplate = Handlebars.compile(this.getElement('#list-item').innerHTML);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    
    if (className) { 
      element.classList.add(className) 
    }

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = '';
  }

  _generateAndAppendListItem(todo) {
    let tempDiv = this.createElement('div');
    let listItemString = this.listItemTemplate({listId: todo.id, text: todo.text});
    let listItem;
    
    tempDiv.innerHTML = listItemString;
    listItem = tempDiv.firstElementChild;

    this.todoList.append(listItem);
  }

  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    if (todos.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to do! Add a task?';
      this.todoList.append(p);
    } else {
      todos.forEach(todo => {
        this._generateAndAppendListItem(todo);
      });
    }
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());

