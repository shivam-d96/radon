const express = require('express');
const externalModule = require("./logger/logger");
const externalModule1 = require("./util/helper");
const externalModule2 = require("./validator/formatter");
const router = express.Router();


router.get('/test-me', function (req, res) {
     res.send('My first assignment on nodejs')
    externalModule1.printDate()
    externalModule1.printMonth()
    externalModule.wel()
    externalModule1.getBatchInfo()
    externalModule2.upper()
    externalModule2.lower()
    externalModule2.trimx()
    
});

module.exports = router;
// adding this comment for no reason
