const express = require('express')

const router = express.Router()

router.use('/index', require('./TestRouter'))

module.exports = router