import { addToDoToContainer, refreshMainContent } from ".";

function openDialogListener() {
    let addToDoButton = document.querySelector("#add-to-do-button");
    let addToDoDialog = document.querySelector(".add-to-do-dialog");
    addToDoButton.addEventListener('click', () => {
        createDialog();
        addToDoDialog.showModal();
    });
}

function createDialog() {
    // Select the div where we will store the created dialog
    const addToDoDialog = document.querySelector('.add-to-do-dialog')

    // Create the form element
    const form = document.createElement('form');
    form.className = 'add-to-do-form';

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.id = 'close-button';
    closeButton.textContent = 'Close';

    // Create the heading
    const heading = document.createElement('h2');
    heading.textContent = 'Add New To-Do';

    // Create the task name label and input
    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'task-name');
    taskNameLabel.textContent = 'Task name:';

    const taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.id = 'task-name';
    taskNameInput.name = 'task-name';
    taskNameInput.placeholder = 'Enter your task here...';
    taskNameInput.maxLength = 120;
    taskNameInput.required = true;

    // Create the description label and textarea
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description:';

    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.id = 'description';
    descriptionTextarea.name = 'description';
    descriptionTextarea.placeholder = 'Add some description here...';
    descriptionTextarea.maxLength = 360;

    // Create the due date label and input
    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'due-date');
    dueDateLabel.textContent = 'Due date:';

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.id = 'due-date';
    dueDateInput.name = 'due-date';
    dueDateInput.required = true;

    // Create the priority fieldset and legend
    const priorityFieldset = document.createElement('fieldset');
    const priorityLegend = document.createElement('legend');
    priorityLegend.textContent = 'Priority';
    priorityFieldset.appendChild(priorityLegend);

    // Create the projects options
    const projects = ['Sports', 'Groceries', 'Appointments', 'Arts'];
    
    const projectLabel = document.createElement('label');
    projectLabel.setAttribute('for', 'project');
    projectLabel.textContent = 'Project';

    const projectSelect = document.createElement('select');
    projectSelect.id = 'project';
    projectSelect.name = 'project';

    for (let project of projects) {
        let projectOption = document.createElement('option');
        projectOption.value = project.toLowerCase();
        projectOption.textContent = project;
        projectSelect.appendChild(projectOption);
    }

    // Create the priority options
    const priorities = [
        { id: 'low', value: 'low', label: 'Low', checked: true },
        { id: 'medium', value: 'medium', label: 'Medium', checked: false },
        { id: 'high', value: 'high', label: 'High', checked: false }
    ];

    priorities.forEach(priority => {
        const div = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = priority.id;
        input.name = 'priority';
        input.value = priority.value;
        input.checked = priority.checked;

        const label = document.createElement('label');
        label.setAttribute('for', priority.id);
        label.textContent = priority.label;

        div.appendChild(input);
        div.appendChild(label);
        priorityFieldset.appendChild(div);
    });

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'submit-button';
    submitButton.textContent = 'Submit';

    // Append all elements to the form
    form.appendChild(closeButton);
    form.appendChild(heading);
    form.appendChild(taskNameLabel);
    form.appendChild(taskNameInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionTextarea);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    form.appendChild(priorityFieldset);
    form.appendChild(projectLabel);
    form.appendChild(projectSelect);
    form.appendChild(submitButton);

    // Append the form to the body (or any other container element)
    addToDoDialog.appendChild(form);

    // Add listener for close button
    closeDialogListener();

    // Add listener for submit button
    submitDialogListener();
}

function removeDialog() {
    const addToDoForm = document.querySelector(".add-to-do-form")
    if (addToDoForm) {
        addToDoForm.remove();
    }
}

function closeDialogListener() {
    let closeButton = document.querySelector("#close-button");
    let addToDoDialog = document.querySelector(".add-to-do-dialog");
    closeButton.addEventListener('click', () => {
        removeDialog();
        addToDoDialog.close();
    });
}

function submitDialogListener(container) {
    let submitButton = document.querySelector("#submit-button");
    let addToDoDialog = document.querySelector(".add-to-do-dialog");
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        
        let title = document.querySelector("#task-name").value;
        let description = document.querySelector("#description").value;
        let dueDate = document.querySelector("#due-date").value;
        let priority = document.querySelector("input[name=priority]:checked").value;
        
        addToDoToContainer(title, description, dueDate, priority);
        refreshMainContent(container);
        removeDialog();
        addToDoDialog.close();
    })
}

export {
    openDialogListener,
}