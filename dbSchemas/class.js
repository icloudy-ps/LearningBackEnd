/*
 * @Author: changaowu
 * @Date: 2023-07-16 14:25:19
 * @LastEditors: changaowu
 * @LastEditTime: 2024-04-04 21:17:49
 * @Description: file content
 * @FilePath: \back_end\dbSchemas\class.js
 */
const mongoose = require("../middlewares/mongoose")
const Schema = mongoose.Schema

// 班期表
const classScheme = new Schema({
    courseName: {
        type: String,
        require: true
    },
    // 班期名
    className: {
        type: String,
        require: true,
        unique: true
    },
    // 招生时间
    enrollTime: {
        type: Array,
        require: true
    },
    // 学员数量
    studentNum: {
        type: Number,
        default: 0
    },
    // 更新人
    updatePeople: {
        type: String,

    },
    updateTime: {
        type: Number,

    },
    // 班期表 和 直播表进行关联， ：目的微辣通过班期获取到它对应的直播列表数据
    refLiveId: {
        type: Schema.Types.ObjectId,
        ref: "live"    //当前字段关联的表
    }
})
module.exports = mongoose.model("class", classScheme)