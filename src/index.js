import './style.css';

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}



let newTask = new ToDo('Eat mango', 'with rice maybe', '2024/08/30', 'High');
console.log(newTask);