# Team Name: 
Group 2

# Special Setup Instructions
No

# Username & Password
Katie
password

John
password

# Instructions and Comments
Our group don't have enough time to implement the whole functionality for the upvote and downvote of comments. 
But up to this stage, we have added upvote and downvote button for each layer of comment, and once those buttons are clicked, their color can be changed back and forth.
When any upvote and downvote button is clickd, comment_id can be sent from client-side.js to route handler for processing, along with user_id retrieved in the router, these data can be passed to DB using some async functions wrote in the comment-dao.js. Besides, in order to store those data, we created an extra table, votecomments, to build a many-to-many between users and comments. 

This wasn’t submitted in our final code, as we thought about this project as if we were delivering this project in industry ie. we wouldn’t push partially complete code/functions into the live environment. We have decided to go with the approach of informing our stakeholders (you!) of our progress and we would expect to have needed another day to complete this feature.



