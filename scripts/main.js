var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo){
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    // // Case 1: If everything’s true, make everything false.
    this.todos.forEach(function(todo){
      if (completedTodos === totalTodos){
        todo.completed = false;
      }else{
        todo.completed = true;
      }
    })
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(position, todoText) {
    todoList.changeTodo(position, todoText);
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position){
      // array.forEach(callback, this); to refer to view object since it isnt equal
      var todoLi = document.createElement('li');
      var toggleCompleteButton = this.createToggleButton();
      var editTodoButton = this.createEditTodoButton();
      var deleteButton = this.createDeleteButton();
      var todoTextLi = this.createTodoListItem(position);
      
      if (todo.completed === true) {
        toggleCompleteButton.setAttribute('checked', 'checked');
      } else {
        toggleCompleteButton.removeAttribute('checked');
      }
      
      todoLi.id = position;
      todoLi.appendChild( todoTextLi );
      todoTextLi.value = todo.todoText;
      // todoTextLi.id = 'edit' + position;
      todoLi.prepend( toggleCompleteButton );
      todoLi.appendChild( editTodoButton );
      // editTodoButton.id = 'save' + position;
      todoLi.appendChild( deleteButton);
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createToggleButton: function(){
    var toggleCompleteButton = document.createElement('input');
    toggleCompleteButton.setAttribute('type', 'checkbox');
    toggleCompleteButton.className = 'toggleCompleteButton';
    return toggleCompleteButton;
  },
  createEditTodoButton: function(){
    var editTodoButton = document.createElement('button');
    editTodoButton.textContent = 'Save';
    editTodoButton.classList.add('editTodoButton', 'hide');
    return editTodoButton;
  },
  createTodoListItem: function(position){
    var todoListItem = document.createElement('input');
    todoListItem.setAttribute('type', 'text');
    todoListItem.setAttribute('data-target', position);
    todoListItem.classList.add('edit');
    return todoListItem;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');
    
    todosUl.addEventListener('click', function(event){
      
      var elementClicked = event.target;
      var todoNumberId = parseInt(elementClicked.parentNode.id);
     
      
      if(elementClicked.className === 'deleteButton'){
        handlers.deleteTodo( todoNumberId );
      }
      if(elementClicked.className === 'toggleCompleteButton'){
        handlers.toggleCompleted( todoNumberId );
      }
      if(elementClicked.className === 'edit'){
     
        for(var i =0; i < elementClicked.attributes.length; i++){

          var attr = elementClicked.attributes[i];
          var sibling = elementClicked.nextElementSibling;
          var elementId = 0;

          if(attr.name === 'data-target'){

            elementId = parseInt(attr.nodeValue);

            if( todoNumberId === elementId ){
              this.focus();
              sibling.classList.toggle('hide');
              return false;
            }

          }
        }
      }
      if(elementClicked.className === 'editTodoButton'){
             // debugger;
        var editTodoText = elementClicked.previousElementSibling.value;
        handlers.changeTodo( todoNumberId, editTodoText);
        elementClicked.classList.toggle('hide'); 
      }
    });
    
//     todosUl.addEventListener('dblclick', function(event){
//       //debugger;
//       var elementClicked = event.target;
//       var todoNumberId = parseInt(elementClicked.parentNode.id);
//       var editTodoInput = document.createElement('input');
//       var todoText = document.querySelector('.editTodo').value;
      
      
//     });
  }
};

view.setUpEventListeners();










