const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const expressArtTemplate = require('express-art-template');
const router = require('./router')
const errorHandler = require('./middleware/error-handler');
const User = require('./entity/User')
const Category = require('./entity/Category')
const { createConnection } = require('typeorm');

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

// 创建数据库连接
createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'typeorm_test',
    entities: [User, Category],
    synchronize: true, // 注意：这个选项在生产环境中不应该开启
}).then(async (connection) => {
    console.log('Connected to the database');
    // 在这里可以进行数据库操作
}).catch(error => console.log(error));

// 模拟数据库查询
function getHeaderData() {
    // 这里假设是从数据库中查询头部数据的逻辑
    return {
        headerTitle: 'Welcome to my website!'
    };
}

// 模拟数据库查询
function getFooterData() {
    // 这里假设是从数据库中查询底部数据的逻辑
    return {
        year: new Date().getFullYear(),
        companyName: 'Your Company'
    };
}

// 中间件：获取头部和底部数据
function fetchHeaderFooterData(req, res, next) {
    // 从数据库获取头部数据
    res.locals.headerData = getHeaderData();

    // 从数据库获取底部数据
    res.locals.footerData = getFooterData();

    next();
}

// 挂载路由
app.use('/', fetchHeaderFooterData, router)

app.get('/admin/login', (req, res) => {
    res.render('admin/login.art')
})

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