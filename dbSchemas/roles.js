// roles角色表规则
const mongoose = require("../middlewares/mongoose")
const Schema = mongoose.Schema


// roles角色规则
const rolesSchema = new Schema({
    // 权限id   1:管理员 其他:非管理员
    Permissionid: {
        type: Number,
        require: true
    },
    // 姓名
    username: {
        type: String,
        require: true,
        // 唯一性
        unique: true
    },

    // 密码
    password: {
        type: String,
        require: true

    },
    // 角色
    role: {

    },
    // 头像
    avatar: {
        type: String,
        // 默认图片
        default: "https://p.qqan.com/up/2020-5/2020051811245458831.jpg"

    }
})
// 导出roles表操纵对象
module.exports = mongoose.model("roles", rolesSchema)