window.addEventListener("load", async function (event) {



    // const commentLayerOne = document.querySelectorAll("span.first_layer_comments");
    // console.log(commentLayerOne);
    // for (let i = 0; i < commentLayerOne.length; i++) {
    //     console.log(commentLayerOne[i].id);
    // }




    // *****增加.js：reply按键仍然对应不准确，应当再创建一个.js文件，然后在main.handlbars中，引用在当前.js文件之后


    renderComments();

    const replyButtonArray = document.querySelectorAll(".replyButton");
    // console.log(replyButtonArray);
    const deleteButtonArray = document.querySelectorAll(".deleteButton");
    const divSecondComments = document.querySelectorAll(".secondComments");
    // console.log(divSecondComments);
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
            // console.log(commentLayerOne[i].id);
            let comment_id = commentLayerOne[i].id;
            let responseOne = await fetch(`/comments-all?comment_id=${comment_id}`);
            let commentLayerTwo = await responseOne.json();
            // console.log(responseOne);
            // console.log(commentLayerTwo);

            for (let j = 0; j < commentLayerTwo.length; j++) {
                // COMMENT1.appendChild(COMMENT2)
                let comment_id = commentLayerTwo[j].comment_id;
                let reponseTwo = await fetch(`/comments-all?comment_id=${comment_id}`);
                let commentLayerThree = await reponseTwo.json();
                // console.log(reponseTwo);
                // console.log(commentLayerThree);

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
                li_two.appendChild(ul_three);

                let span = document.createElement("span");
                span.innerHTML = `<button class="replyButton">reply</button>
                    <button class="deleteButton">delete</button>`;

                let divComment = document.createElement("div");
                divComment.style.display = "none";
                divComment.classList.add("secondComments");
                console.log(divComment);
                divComment.innerHTML =
                    `<form action="/add-2nd-comment" method="POST" class="form">
                        <input type="hidden" name="parent_comment_id" value="${commentLayerTwo[j].comment_id}">
                        <textarea name="secondComment"></textarea>
                        <div class="flex-row justify-sb align-center">
                            <button class="button2nd" type="submit">Post comment</button>
                        </div>
                    </form>`

                ul_Two.appendChild(li_two);
                ul_Two.appendChild(span);
                ul_Two.appendChild(divComment);

                commentLayerOne[i].appendChild(ul_Two);
            }
        }
    }


});