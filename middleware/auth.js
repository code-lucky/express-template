const { jwtSecrret } = require("../config/config.default")
const { verify } = require("../util/jwt")
module.exports = async (req, res, next) => {
    // 从请求头获取token数据
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).end()
    }

    try{
        const decodedToken = await verify(token, jwtSecrret)
        // req.user = await User.findById(decodedToken.userId)
        next()
    } catch(err) {
        return res.status(401).end()
    }
    // 验证 token 是否有效
    // 无效 -> 响应401状态码
    // 有效 -> 把用户信息读取出来挂载到 req请求对象上，继续往后执行


}