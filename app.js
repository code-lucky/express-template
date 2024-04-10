const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const expressArtTemplate = require('express-art-template');
const router = require('./router')
const errorHandler = require('./middleware/error-handler');
const { render } = require('art-template');

const app = express()
// 设置视图引擎为 art-template
app.engine('art', expressArtTemplate);
// 设置视图文件夹的路径
app.set('views', path.join(__dirname, 'views'));
// 设置默认的模板文件扩展名为 .art
app.set('view engine', 'art');


// 全局日志
app.use(morgan('dev'))
// 获取json数据
app.use(express.json())
// 获取普通请求参数
app.use(express.urlencoded())
// 解决跨域问题
app.use(cors())

// 挂载路由
app.use('/test', router)

// 挂载路由
app.get('/index', (req, res) => {
    const data = [{ name: 'hqh1', val: 1 }, { name: 'hqh2', val: 2 }, { name: "hqh3", val: 3 }]
    res.render('index', { data: data })
})

// 处理全局错误
app.use(errorHandler)


const port = 3006
// 监听3000端口
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})