window.addEventListener("load", async function (event) {
    const replyButtonArray = document.querySelectorAll(".replyButton");
    const deleteButtonArray = document.querySelectorAll(".deleteButton");
    const divSecondComments = document.querySelectorAll(".secondComments");

    // const commentLayerOne = document.querySelectorAll("span.first_layer_comments");
    // console.log(commentLayerOne);
    // for (let i = 0; i < commentLayerOne.length; i++) {
    //     console.log(commentLayerOne[i].id);
    // }

    renderComments();

    // Reply to first layer comments
    for (let i = 0; i < replyButtonArray.length; i++) {

        replyButtonArray[i].addEventListener("click", function () {
            divSecondComments[i].style.display = "block";
        });
    }


    // NESTING OF COMMENTS: THREE LAYERS
   
    async function renderComments() {
        console.log("CLICKED");
        const commentLayerOne = document.querySelectorAll("span.first_layer_comments"); // COMMENT1
        // console.log(commentLayerOne);
        // let responseOne = await fetch("/comments-all");
        // console.log(responseOne);
        // console.log("CLICKEDTWO");
        for (let i = 0; i < commentLayerOne.length; i++) {
            console.log(commentLayerOne[i].id);
            let comment_id = commentLayerOne[i].id;
            let responseOne = await fetch(`/comments-all?comment_id=${comment_id}`);
            let commentLayerTwo = await responseOne.json();
            console.log(responseOne);
            console.log(commentLayerTwo);

            for (let j = 0; j < commentLayerTwo.length; j++) {
                // COMMENT1.appendChild(COMMENT2)
                // let comment_id = commentLayerTwo[j].comment_id;
                // let reponseTwo = await fetch(`/comments-all?comment_id=${comment_id}`);
                // let commentLayerThree = await reponseTwo.json();
                // console.log(reponseTwo);
                // console.log(commentLayerThree);

                let ul_Two = document.createElement("ul");
                let li_two = document.createElement("li");
                ul_Two.appendChild(li_two);
                // for (let k = 0; k < commentLayerThree.length; k++) {
                //     // COMMENT2.appendChild(COMMENT3)
                //     let li_Two = document.createElement("li");
                //     li_Two.innerText = commentLayerThree[k].content;
                //     ul_Two.appendChild(li_Two);
                // }

                li_two.innerText = commentLayerTwo[j].content;
                commentLayerOne[i].appendChild(ul_Two);

                let buttonOne = document.createElement("button");
                buttonOne.innerText = "reply";
                let buttonTwo = document.createElement("button");
                buttonTwo.innerText = "delete";

                commentLayerOne[i].appendChild(buttonOne);
                commentLayerOne[i].appendChild(buttonTwo);

                // let divThird = document.createElement("div");
                // divThird.style.display = "none";
                // divThird.innerHTML = `
                // BBBB
                // <form action="/add-3rd-comment" method="POST" class="form">
                //     <input type="hidden" name="parent_comment_id" value="${commentLayerTwo[j].comment_id}">
                //     <textarea name="thirdComment"></textarea>
                //     <div class="flex-row justify-sb align-center">
                //         <button class="button" type="submit">Post comment</button>
                //     </div>
                // </form>`;
            }
        }
    }


});