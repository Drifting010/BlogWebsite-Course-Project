// Setup Express
const express = require("express");
const app = express();

// Setup fs
const fs = require("fs");

// Setup body-parser
app.use(express.urlencoded({ extended: false }));

// Setup multer (files will temporarily be saved in the "temp" folder).
const path = require("path");
const multer = require("multer");
const upload = multer({
    dest: path.join(__dirname, "temp")
});

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, "public")));

// When navigating to "/", show a form allowing users to upload images.
app.get("/", function (req, res) {
    res.render("create-article");
});

// When we POST to /uploadImage, use Multer to process the "imageFile" upload.
// Then, move the uploaded image to /public/uploadedFiles/NAME, where NAME is the
// file's original name.
// Finally, send the image and caption to the uploadDetails view for rendering.
app.post("/uploadImage", upload.single("imageFile"), function (req, res) {

    const fileInfo = req.file;

    // Move the file somewhere more sensible
    const oldFileName = fileInfo.path;
    const newFileName = `./public/uploadedFiles/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);

    // Get some information about the file and send it to the uploadDetails view for rendering.
    res.locals.fileName = fileInfo.originalname;
    res.locals.caption = req.body.caption;
    res.render("uploadDetails");

});

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});