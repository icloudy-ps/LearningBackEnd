/*
 * @Author: changaowu
 * @Date: 2023-07-16 14:25:29
 * @LastEditors: changaowu
 * @LastEditTime: 2024-04-04 21:22:22
 * @Description: file content
 * @FilePath: \back_end\router\index.js
 */
// 路由入口文件。每个能进来的路由都是 /api开头
const express = require("express")
const router = express.Router()  //模块化路由处理
const { verifyToken } = require("../middlewares/jwt/authorization")

// 登录     /api/login
router.use("/login", require("./login"))

//项目相关的描述数据
router.use("/projectData", require("./projectData"))

// 获取角色相关的信息
router.use("/role", verifyToken, require("./role"))

//  权限路由
// router.use("/router/menu",verifyToken,require("./menu/index"))

// 获取学员相关的信息
router.use("/student", verifyToken, require("./student"))

// 处理导入
router.use("/import", verifyToken, require("./import"))

// 处理课程相关请求
router.use("/course", verifyToken, require("./course"))

// 处理班期相关请求
router.use("/class", verifyToken, require("./class"))

module.exports = router


