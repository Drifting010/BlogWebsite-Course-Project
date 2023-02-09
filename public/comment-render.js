window.addEventListener("load", async function (event) {

    // When click repy button, textarea appears
    const replyButtonArray = document.querySelectorAll(".replyButton");

    const buttonDeleteOne = document.querySelectorAll(".deleteButton");
    const divFirstCommentReply = document.querySelectorAll("div.firstCommentReply");

    const divFirstComment = document.querySelectorAll("div.firstComment");
    // Reply to first layer comments
    for (let i = 0; i < replyButtonArray.length; i++) {
        replyButtonArray[i].addEventListener("click", function () {
            divFirstCommentReply[i].style.display = "block";
        });
    }

    // Delete first layer comments
    // comments id
    const commentLayerOne = document.querySelectorAll("span.first_layer_comments");
    // console.log(commentLayerOneId);
    for (let i = 0; i < buttonDeleteOne.length; i++) {
        let commentId = commentLayerOne[i].id;
        console.log(commentId);
        buttonDeleteOne[i].addEventListener("click", function () {
            location.href = `/comments-delete?id=${commentId}`; // Backend → pass param to router 
            buttonDeleteOne[i].remove(); // delete button
        });
    }

    // rendering all levels of comments
    renderComments();



    // FUNCTIONS
    // NESTING, REPLYING, and DELETEION of comments
    async function renderComments() {

        const commentLayerOne = document.querySelectorAll("span.first_layer_comments"); // COMMENT1

        // COMMENT NESTING
        for (let i = 0; i < commentLayerOne.length; i++) { // first layer iteration
            let comment_id = commentLayerOne[i].id;
            let responseOne = await fetch(`/comments-all?comment_id=${comment_id}`);
            let commentLayerTwo = await responseOne.json();

            // COMMENT1.appendChild(COMMENT2)
            for (let j = 0; j < commentLayerTwo.length; j++) { // second layer iteration
                let comment_id = commentLayerTwo[j].comment_id;
                let reponseTwo = await fetch(`/comments-all?comment_id=${comment_id}`);
                let commentLayerThree = await reponseTwo.json();

                // BUTTON: Reply and Delete
                let span = document.createElement("span");
                const buttonReply = document.createElement("button");
                buttonReply.innerText = "reply";
                const buttonDelete = document.createElement("button");
                buttonDelete.innerText = "delete";
                span.appendChild(buttonReply);
                span.appendChild(buttonDelete);

                // COMMENT2.appendChild(COMMENT3)
                // Layer Three comments for each layer two 
                let ul_three = document.createElement("ul");
                ul_three.style.listStyleType = "none"; // bullet remove

                for (let k = 0; k < commentLayerThree.length; k++) { // third layer iteration
                    // button: delete
                    let buttonDeleteThree = document.createElement("button");
                    buttonDeleteThree.innerText = "delete";
                    // LAYER THREE: add event to delete button 
                    let id = commentLayerThree[k].comment_id;
                    buttonDeleteThree.addEventListener("click", function () {
                        location.href = `/comments-delete?id=${id}`; // Backend → pass param to router 
                        buttonDeleteThree.remove(); // delete button
                    });
                    // content
                    let li_three = document.createElement("li");
                    li_three.innerText = commentLayerThree[k].content;
                    li_three.appendChild(buttonDeleteThree);
                    ul_three.appendChild(li_three);
                }

                // Layer Two comments for each layer one
                let ul_Two = document.createElement("ul");
                ul_Two.style.listStyleType = "none"; // bullet remove 

                let li_two = document.createElement("li");
                li_two.innerText = commentLayerTwo[j].content; // CONTENT: add content of each layer two comment

                // LAYER TWO: add event to delete button
                let idTwo = commentLayerTwo[j].comment_id;
                buttonDelete.addEventListener("click", function () {
                    location.href = `/comments-delete?id=${idTwo}`; // Backend → pass param to router 
                    buttonDelete.remove(); // delete button
                });

                li_two.appendChild(span); // BUTTON: attach reply and delete buttons to each layer two comment

                // Functionality: reply to layer two comments
                // reply div
                let divSecondCommentReply = document.createElement("div");
                divSecondCommentReply.style.display = "none";
                // add event for reply button
                buttonReply.addEventListener("click", function (event) {
                    divSecondCommentReply.style.display = "block";
                });

                divSecondCommentReply.innerHTML =
                    `<form action="/add-2nd-comment" method="POST" class="form">
                        <input type="hidden" name="parent_comment_id" value="${commentLayerTwo[j].comment_id}">
                        <textarea name="secondComment"></textarea>
                        <div class="flex-row justify-sb align-center">
                            <button class="button2nd" type="submit">Post comment</button>
                        </div>
                    </form>`;

                li_two.appendChild(divSecondCommentReply); // add reply div to corresponding layer two comment

                let divSecondComment = document.createElement("div"); // container: wrap the whole level two and level three
                ul_Two.appendChild(li_two); // layer two comments
                ul_Two.appendChild(ul_three); // layer three comments
                divSecondComment.appendChild(ul_Two); // attach both layer two and layer three to the container

                divFirstComment[i].appendChild(divSecondComment); // attach second layer contianer to first layer container
            }
        }
    }
});