const express = require('express');
const router = express.Router();

const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", BookController.createBook  )

router.post("/createAuthorData", BookController.createAuthorData)

router.post("/bookByChetan", BookController.bookByChetan  )

router.post("/findAuthor", BookController.findAuthor )

router.post("/findBook", BookController.findBooks )

module.exports = router;