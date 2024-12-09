/*
 * @Author: changaowu
 * @Date: 2023-07-16 14:25:19
 * @LastEditors: changaowu
 * @LastEditTime: 2024-04-12 16:27:06
 * @Description: file content
 * @FilePath: \back_end\app.js
 */
const express = require("express")
const app = express()
// require("./data/index") //预设的数据 

app
    .use(express.json())
    .use(express.static("./public"))
    .use("/api", require("./router/index"))



app.listen(8889, () => console.log("开始监听8888端口"))
