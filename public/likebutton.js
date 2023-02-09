window.addEventListener("load", function () {
    
    console.log(`App listening on port!`)

    const likeButtons = document.querySelectorAll("#likeButton");


    likeButtons.forEach(function(likeButton){
        console.log(likeButton);

        likeButton.addEventListener("click", function (event) {
            console.log("Is clicked...");
            // TODO: make the upvote recorded in the database and then change image
            console.log(event.target.src);
            if (event.target.src === "http://localhost:3000/images/thumbup1.jpg"){
                console.log("Is true...");
                event.target.src = "/images/thumbup2.jpg"
            } else {
                event.target.src = "/images/thumbup1.jpg"
            }


            // event.target.src = "/images/thumbup2.jpg";
            
            

        });


    });

    // dislikeButtons.forEach(function(dislikeButton){
    //     console.log(dislikeButton);

    //     dislikeButton.addEventListener("click", function (event) {

    //         //const img = document.querySelector("#likeButton");
    //         event.target.src = "/images/thumbdown2.jpg";

    //     });


    // });

 
    

    // dislikeButton.addEventListener("click", function (event) {

    //     const img2 = document.querySelector("#dislikeButton");
    //     img2.src = "/images/thumbdown2.jpg";

    // });

});