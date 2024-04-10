const jwt = require('../util/jwt')
const { jwtSecrret } = require('../config/config.default')
// 用户登录
exports.login = async (req, res, next) => {
    try{
        const user = req.user.toJSON()
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecrret, {
            expiresIn: "2 days"
        })
        res.status(200).json({
            token
        })
    } catch (err) {
        next(err)
    }
}


// 更新用户
exports.index = async (req, res, next) => {
    try{
        res.send({data:"Header"})
    } catch (err) {
        next(err)
    }
}