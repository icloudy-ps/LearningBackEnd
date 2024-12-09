/*
 * @Author: changaowu
 * @Date: 2023-07-16 14:25:19
 * @LastEditors: changaowu
 * @LastEditTime: 2024-04-04 21:33:17
 * @Description: file content
 * @FilePath: \back_end\dbSchemas\course.js
 */
const mongoose = require("../middlewares/mongoose")
const Schema = mongoose.Schema
// 表规则
const courceSchema = new Schema({
    //课程类别
    kindName: {
        type: String,
        require: true
    },
    // 课程名称
    courseName: {
        type: String,
        require: true
    },
    // 售价
    sellingPrice: {
        type: Number,
        require: true
    },
    // 
    isSale: {
        type: Boolean,
        default: true
    },
    // 更新者
    updatePeople: {
        type: String,
        require: true
    },
    // 更新时间
    updateTime: {
        type: String,
        default: Date.now()
    },
    // 课程描述
    description: {
        type: String,

    },
    // 课程封面
    coverImage: {
        type: String,

    },
    courseVideo: {
        type: String,
    }



})
module.exports = mongoose.model("course", courceSchema)