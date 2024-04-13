const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const expressArtTemplate = require('express-art-template');
const router = require('./router')
const errorHandler = require('./middleware/error-handler');
const { render } = require('art-template');

const app = express()
app.use(express.static(path.join(__dirname, 'public')));
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
app.use('/', router)

// 定义一个中间件来捕获未知路由并返回 404 错误
app.use((req, res, next) => {
    // 创建一个 Error 对象并设置状态码为 404
    const error = new Error('Not Found');
    error.status = 404;

    // 将错误对象传递给 Express 的错误处理中间件
    next(error);
});

// 处理全局错误
app.use(errorHandler)


const port = 3006
// 监听3000端口
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})