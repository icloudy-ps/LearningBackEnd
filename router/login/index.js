/*
 * @Author: changaowu
 * @Date: 2023-07-16 14:25:29
 * @LastEditors: changaowu
 * @LastEditTime: 2024-04-12 23:54:38
 * @Description: file content
 * @FilePath: \back_end\router\login\index.js
 */
const express = require("express")
const router = express.Router()
const { generateToken } = require("../../middlewares/jwt/authorization")
const roleTable = require("../../dbSchemas/roles")
const studentTable = require("../../dbSchemas/student")
// 处理登录请求 ： /api/login
router.post("/", async (req, res) => {
    const { username, password } = req.body
    console.log("username", req.body)
    const data = await roleTable.findOne({ username, password }, { _id: 0, __v: 0 })

    if (!data) {
        const student = await studentTable.findOne({ phone: username })
        console.log("student", student)
        if (student && password === "123456") {
            const token = generateToken({ username, role: '学生' })
            await roleTable.insertMany({ role: "学生", username: username, password: password })
            console.log("成功", student)
            return res.send({ code: 201, msg: "新加学生成功", token, userInfo: { username, role: "学生" } })

        }

        return res.status(401).send({ code: 401, msg: "账户或密码有误，请正确填写" })

    }
    const { role, avatar, permissionId } = data
    //生成token
    const token = generateToken({ username, role, avatar })

    res.send({ code: 200, msg: "登陆成功", token, userInfo: { username, role, avatar, permissionId } })
})
module.exports = router

// 哈希加盐 ：wz23456,key

