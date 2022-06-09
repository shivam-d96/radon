const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.post("/createPublisher", authorController.createPublisher)

router.post("/createBook", bookController.createBook)

router.get("/fetchBook", bookController.fetchBooks)

router.put("/book" , bookController.updatePrice)

module.exports = router;