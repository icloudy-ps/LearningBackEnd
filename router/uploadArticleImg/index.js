const express = require("express")
const router = express.Router()
const path = require("path")
const { uploadArticleImageStorage } = require("../../middlewares/uploadFlies/index")

//  处理上传文章内引用的图片文件
router.post("/", uploadArticleImageStorage.single("article-img"), async (req, res) => {
    // console.log(req.file)
    if (!req.file) return res.status(400).send({ "errno": 1, "message": "失败信息" })
    let imgUrl = "/file/images/articleImage/"
    res.send({
        errno: 0, // 注意：值是数字，不能是字符串
        data: {
            url: imgUrl + req.file.filename, // 图片 src 
        }
    })
})

//  处理上传文章内引用的图片文件
// router.post("/", uploadArticleImageStorage.array("article-img", 12), async (req, res) => {
//     console.log(req.files)
//     if (req.files.length < 0) return res.status(400).send({ "errno": 1, "message": "失败信息" })
//     let imgUrl = "/file/images/articleImage/"
//     res.send({
//         errno: 0, // 注意：值是数字，不能是字符串
//         data: {
//             url: imgUrl + req.files[0].filename, // 图片 src 
//         }
//     })
// })


module.exports = router