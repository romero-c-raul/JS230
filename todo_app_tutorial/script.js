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
  constructor() {}
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());

