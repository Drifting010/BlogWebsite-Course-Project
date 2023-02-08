window.addEventListener("load", function (event) {
    const replyButtonArray = document.querySelectorAll(".replyButton");
    const deleteButtonArray = document.querySelectorAll(".deleteButton");
    const divSecondComments = document.querySelectorAll(".secondComments");

    // Reply to first layer comments
    for (let i = 0; i < replyButtonArray.length; i++) {

        replyButtonArray[i].addEventListener("click", function () {
            // console.log("Clicked");
            // const display = divSecondComments[i].style.display;
            // console.log(display);
            divSecondComments[i].style.display="block";

            
        });
    }
});