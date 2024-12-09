const mongoose = require("../middlewares/mongoose")
const Schema = mongoose.Schema
// 表规则
const studentSchema = new Schema({
    // 手机号
    phone: {
        type: Number,
        require: true,
        unique: true  // 随机生成的手机号可能会重复, 导致插入数据失败
    },
    // 类别. eg: web/python/java/插画/影视后期...
    kindName: {
        type: String,
        require: true
    },
    // 课程阶段名。 eg：前端进阶班 / 前端全栈班 / 前端基础语法班...
    courseName: {
        type: String,
        require: true
    },
    // 班期名。 eg: web-前端框架班-丸子
    className: {
        type: String,
        require: true
    },
    // 来源: 后台导入 / 自主注册
    origin: {
        type: String,
        default: "自主注册"
    },
    // 更新人
    updatePeople: {
        type: String,
        require: true
    },
    // 更新时间
    updateTime: {
        type: Number,
        require: true
    },
    // 学员的详细信息（建议联表查询, 并且表头会更多）
    detailInfo: {
        phone: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            default: ""
        },
        wechat: {
            type: String,
            default: "wz-zm"
        },
        age: {
            type: Number,
            default: 20
        },
        sex: {
            type: String,
            default: "",
        },
        city: {
            type: Array,
        },
        education: {
            type: String,
            default: ""
        }
    }
})
// 导出student表操作对象
module.exports = mongoose.model("student", studentSchema)