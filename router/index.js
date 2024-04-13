const express = require('express')

const router = express.Router()

router.use('/test', require('./TestRouter'))

// 挂载路由
router.get('/index', (req, res) => {
    const data = [{ name: 'hqh1', val: 1 }, { name: 'hqh2', val: 2 }, { name: "hqh3", val: 3 }]
    res.render('index', { data: data })
})

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router