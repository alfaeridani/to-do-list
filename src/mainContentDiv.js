function removeMainContent() {
    const content = document.querySelector(".main-content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

function refreshMainContent(container) {
    removeMainContent();
    let mainContentDiv = document.querySelector(".main-content");
    for (let toDo of container) {
        let title = document.createElement("h2");
        title.textContent = toDo.title;
        mainContentDiv.appendChild(title);
    }
}

export {
    refreshMainContent
}