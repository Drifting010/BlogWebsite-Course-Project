window.addEventListener("load", function () {


    likeButton.addEventListener("click", function (event) {

        const img = document.querySelector("#likeButton");
        img.src = "/images/thumbup2.jpg";

    });

    dislikeButton.addEventListener("click", function (event) {

        const img2 = document.querySelector("#dislikeButton");
        img2.src = "/images/thumbdown2.jpg";

    });

});