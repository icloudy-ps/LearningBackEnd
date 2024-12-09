/*
 * @Author: changaowu
 * @Date: 2023-07-16 14:25:29
 * @LastEditors: changaowu
 * @LastEditTime: 2024-04-04 21:24:32
 * @Description: file content
 * @FilePath: \back_end\router\role\index.js
 */
const express = require("express")
const router = express.Router()
const { generateToken } = require("../../middlewares/jwt/authorization")
const roleTable = require("../../dbSchemas/roles")

// 请求用户信息
router.get("/user", async (req, res) => {
    // console.log("userInfo", req.userInfo);
    let { username, role } = req.userInfo
    let data = await roleTable.findOne({ username, role }, { password: 0, __id: 0, __v: 0 })
    if (!data) return res.status(404).send({ code: 404, msg: "未查询到用户信息，建议重新登录，或者联系管理员" })
    res.status(200).send({ code: 200, msg: "当前登录的用户信息获取成功", data })
})

module.exports = router


// 哈希加盐