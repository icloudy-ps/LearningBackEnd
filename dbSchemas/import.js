const mongoose = require("../middlewares/mongoose")
const Schema = mongoose.Schema

// 存储批量导入学员的记录信息
const importSchema = new Schema({
    // 文件名 
    fileName: {
        type: String,
        required: true
    },
    // 导入时间
    time: {
        type: Number,
        required: true
    },
    // 导入人
    importPeople: {
        type: String,
        required: true
    },
    // 导入状态  0(全部成功) 1(部分成功) 2(全部失败)
    status: {
        type: Number,
        required: true
    },
    // 状态描述
    statusDescription: {
        type: String,
        required: true
    },
    // 导入数据的总数
    total: {
        type: Number,
        required: true
    },
    // 成功存入数据库的数据数量
    successCount: {
        type: Number,
        required: true
    },
    // 存入数据库失败的数据数量
    defeatCount: {
        type: Number,
        required: true
    },
    // 不符合规则以及存入失败的数组
    importStudentError: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model("import", importSchema)