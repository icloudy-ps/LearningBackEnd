const mongoose = require("../middlewares/mongoose")
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: { type: String, required: true }, //文章标题
    description: { type: String, required: true },//文章描述
    tag: { type: String, required: true }, // 文章标签
    date: { type: Number }, // 创建时间
    author: { type: String }, // 作者
    content: { type: String, required: true } // 内容
})

module.exports = mongoose.model("article", articleSchema)