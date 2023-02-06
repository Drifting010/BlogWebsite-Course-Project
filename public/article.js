window.addEventListener("load", function (event) {
    
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
});