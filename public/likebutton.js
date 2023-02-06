window.addEventListener("load", function () {


    likeButton.addEventListener("click", function (event) {

        const img = document.querySelector("#likeButton");
        img.src = "/thumbup2.jpg";

    });

    dislikeButton.addEventListener("click", function (event) {

        const img2 = document.querySelector("#dislikeButton");
        img2.src = "/thumbdown2.jpg";

    });

});