function removeMainContent() {
    const content = document.querySelector(".main-content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

function addDeleteButtonListener(container, toDo) {
    let index = container.indexOf(toDo);
    container.splice(index, 1);
    refreshMainContent(container);
}

function refreshMainContent(container) {
    removeMainContent();
    let mainContentDiv = document.querySelector(".main-content");
    for (let toDo of container) {
        let title = document.createElement("h2");
        title.textContent = toDo.title;
        mainContentDiv.appendChild(title);

        let button = document.createElement("button");
        button.textContent = "Delete";
        mainContentDiv.appendChild(button);

        button.addEventListener('click', () => {
            addDeleteButtonListener(container, toDo);
        });
    }
}

export {
    refreshMainContent
}