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


    const articleLikeDiv = document.querySelectorAll("div.articleLike");

    async function likeStatus(article_id) {
        for (let i = 0; i < articleLikeDiv.length; i++) {
            article_id = articleLikeDiv[i].id;

            const checkLikeStatus = await fetch(`/likeStatusOnLoad?id=${article_id}`);
            let likeStatus = await checkLikeStatus.json();

            let img = document.querySelector(`img.likeButton${article_id}`)
            if (likeStatus.user_id !== undefined) {
                img.src = "./images/thumbup2.jpg";
            } else {
                img.src = "./images/thumbup1.jpg";
            }

        }
    }

    likeStatus();


    for (let i = 0; i < articleLikeDiv.length; i++) {
        articleLikeDiv[i].addEventListener("click", async function () {
            article_id = articleLikeDiv[i].id;
            console.log(article_id);

            const checkLikeStatus = await fetch(`/likeStatus?id=${article_id}`);
            let likeStatus = await checkLikeStatus.json();

            let img = document.querySelector(`img.likeButton${article_id}`)
            if (likeStatus.user_id !== undefined) {
                img.src = "./images/thumbup2.jpg";
            } else {
                img.src = "./images/thumbup1.jpg";
            }
        });
    }

});