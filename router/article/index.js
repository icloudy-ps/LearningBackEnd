const express = require("express")
const router = express.Router()
const articleDB = require("../../dbSchemas/article")

// 新增文章
router.post("/addArticle", async (req, res) => {
    const { title, description, content, tag } = req.body
    const { username } = req.userInfo
    if (title && description && content && tag) { // 都有值
        articleDB
            .create({
                title,
                description,
                content,
                tag,
                date: Date.now(),
                author: username
            })
            .then(() => {
                res.send({ code: 200, msg: "文章创建成功" })
            })
            .catch(() => {
                res.status(400).send({ code: 400, msg: "文章创建失败" })
            })
    } else {
        res.status(400).send({ code: 400, msg: "参数不能有空, 文章创建失败" })
    }
})

// 获取文章列表
router.get("/articleList", async (req, res) => {
    // 每页长度  页码   标签
    const { pageSize, pageCode, tag } = req.query
    let data = await articleDB.find({}, { __v: 0 })
    if (data.length <= 0) return res.status(400).send({ code: 400, msg: "文章列表查询失败" })
    // 获取所有的标签值数组
    const tagList = [...new Set(data.map( item => item.tag))]

    // 筛选
    if(tag) data = data.filter(item => item.tag === tag)
    
    
    const total = data.length
    // 按照文章创建时间倒序排序
    data.sort((a, b) => b.date - a.date)
    data = data.splice((pageCode - 1) * pageSize, pageSize)
    res.send({ code: 200, data, total, tagList, msg: "文章列表查询成功" })
})

// 删除文章
router.delete("/deleteArticle", async (req, res) => {
    const {_id} = req.body
    if(!_id) return res.status(400).send({ code: 400, msg: "删除文章的参数不能为空" })
    articleDB
        .deleteOne({_id})
        .then(() => {
            res.send({ code: 200, msg: "文章删除成功" })
        })
        .catch(() => {
            res.status(400).send({ code: 400, msg: "文章删除失败" })
        })
})

module.exports = router