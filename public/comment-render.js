window.addEventListener("load", async function (event) {

    // When click repy button, textarea appears
    const replyButtonArray = document.querySelectorAll(".replyButton");

    const deleteButtonArray = document.querySelectorAll(".deleteButton");
    const divFirstCommentReply = document.querySelectorAll("div.firstCommentReply");

    const divFirstComment = document.querySelectorAll("div.firstComment");
    // Reply to first layer comments
    for (let i = 0; i < replyButtonArray.length; i++) {

        replyButtonArray[i].addEventListener("click", function () {
            divFirstCommentReply[i].style.display = "block";
        });
    }

    // rendering all levels of comments
    renderComments();



    // FUNCTIONS
    // NESTING AND REPLYING OF COMMENTS
    async function renderComments() {

        const commentLayerOne = document.querySelectorAll("span.first_layer_comments"); // COMMENT1

        // COMMENT NESTING
        for (let i = 0; i < commentLayerOne.length; i++) {
            let comment_id = commentLayerOne[i].id;
            let responseOne = await fetch(`/comments-all?comment_id=${comment_id}`);
            let commentLayerTwo = await responseOne.json();

            // COMMENT1.appendChild(COMMENT2)
            for (let j = 0; j < commentLayerTwo.length; j++) {
                let comment_id = commentLayerTwo[j].comment_id;
                let reponseTwo = await fetch(`/comments-all?comment_id=${comment_id}`);
                let commentLayerThree = await reponseTwo.json();

                // Reply and Delete button
                let span = document.createElement("span");
                const buttonReply = document.createElement("button");
                buttonReply.innerText = "reply";
                const buttonDelete = document.createElement("button");
                buttonDelete.innerText = "delete";
                span.appendChild(buttonReply);
                span.appendChild(buttonDelete);

                // COMMENT2.appendChild(COMMENT3)
                let ul_three = document.createElement("ul");
                ul_three.style.listStyleType = "none"; // bullet remove

                for (let k = 0; k < commentLayerThree.length; k++) {
                    let li_three = document.createElement("li");
                    li_three.innerText = commentLayerThree[k].content;
                    ul_three.appendChild(li_three);
                }

                let ul_Two = document.createElement("ul");
                ul_Two.style.listStyleType = "none"; // bullet remove 

                let li_two = document.createElement("li");
                li_two.innerText = commentLayerTwo[j].content;
                li_two.appendChild(span);

                // Input div to reply layer two comments
                let divSecondCommentReply = document.createElement("div");
                divSecondCommentReply.style.display = "none";

                buttonReply.addEventListener("click", function (event) {
                    divSecondCommentReply.style.display = "block";
                });

                // console.log(divSecondCommentReply);
                divSecondCommentReply.innerHTML =
                    `<form action="/add-2nd-comment" method="POST" class="form">
                        <input type="hidden" name="parent_comment_id" value="${commentLayerTwo[j].comment_id}">
                        <textarea name="secondComment"></textarea>
                        <div class="flex-row justify-sb align-center">
                            <button class="button2nd" type="submit">Post comment</button>
                        </div>
                    </form>`;


                li_two.appendChild(divSecondCommentReply);

                let divSecondComment = document.createElement("div");
                ul_Two.appendChild(li_two);
                ul_Two.appendChild(ul_three);
                divSecondComment.appendChild(ul_Two);

                divFirstComment[i].appendChild(divSecondComment);

            }
        }
    }

});