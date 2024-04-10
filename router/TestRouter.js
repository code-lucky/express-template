const express = require('express')
const TestController = require('../controller/TestController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get("/index", TestController.index)

module.exports = router