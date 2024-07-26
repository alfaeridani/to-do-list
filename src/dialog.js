function openDialog() {
    let addToDoDialog = document.querySelector(".add-to-do-dialog");
    addToDoDialog.showModal();
}

function closeDialog() {
    let addToDoDialog = document.querySelector(".add-to-do-dialog");
    addToDoDialog.close();
}

export {
    openDialog,
    closeDialog
}