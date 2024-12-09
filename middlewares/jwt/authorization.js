// bcryptjs jsonwebtoken
const { SECRET_KEY } = require("../../constant/index")
const jwt = require("jsonwebtoken")
// 生成token
const generateToken = function (payload) {
    /**
     *  payload 载荷. （包含用户信息）
     *  SECRET_KEY 密钥,用于签名和验证JWT
     *  加密指定的算法 、token过期时间
     */
    return "Bearer " + jwt.sign(payload, SECRET_KEY, { algorithm: "HS512", expiresIn: "1h" })
}
// 验证token(鉴权中间件)
const verifyToken = function (req, res, next) {
    // 从请求头中的authorization字段值中取出token
    const token = req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).json({ code: "401", msg: "未提供token,请登录" })
    // 校验token的有效性
    jwt.verify(token, SECRET_KEY, { algorithm: "HS512" }, (err, info) => {
        if (err) {
            console.log("校验token失败", err)
            return res.status(401).json({ code: "401", msg: "token无效或过期,请登录" })
        }
        // JWT校验通过
        console.log("JWT校验通过 : ", info)
        // 将部分用户信息对象添加到req对象上
        req.userInfo = info
        next()
    })
}
module.exports = {
    generateToken,
    verifyToken
}

/* 
    在请求头中设置字段：值为初次登录成功后得到的token
        Authorization: Bearer sfsfsdfsdfs-token
*/