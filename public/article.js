window.addEventListener("load", function (event) {
    // EDIT ARTICLE
    // Send article_id to router once the edit button is clicked
    const editButtons = document.querySelectorAll("button.editArticleButton");
    const editInputHidden = document.querySelectorAll("input.editHidden");
    let article_id;
    let hiddenInput;

    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function () {
            article_id = editButtons[i].id;
            hiddenInput = editInputHidden[i];
            hiddenInput.setAttribute("value", article_id);
        });
    }

    // DELETE ARTICLE
    const deleteButtons = document.querySelectorAll("button.deleteArticleButton");
    const deleteInputHidden = document.querySelectorAll("input.deleteHidden");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            article_id = deleteButtons[i].id;
            hiddenInput = deleteInputHidden[i];
            hiddenInput.setAttribute("value", article_id);
        });
    }
});