const express = require("express");
const {
    createScreen
} = require('../controllers/screen');

const router = express.Router();

router.post("/create", createScreen);

module.exports = router;