const express = require("express")
const router = express.Router()
const courseDB = require("../../dbSchemas/course")
const { uploadCoverImageStorage, uploadVideoStorage } = require("../../middlewares/uploadFiles/index")

// 处理请求课程列表
router.get("/courseList", async (req, res) => {
    // 类别 课程名(阶段) 页码 每页条数
    const { kindName, courseName, pageNum, pageSize } = req.query
    // 查询数据
    let data = await courseDB.find({}, { __v: 0 })
    if (data.length <= 0) return res.status(400).send({ code: 400, msg: "未查询到课程数据" })
    // 取出所有的课程类别, 去重
    let kindNameList = [...new Set(data.map(item => item.kindName))]
    // 筛选
    if (kindName) data = data.filter(item => item.kindName === kindName)
    if (courseName) data = data.filter(item => item.courseName.includes(courseName)) // 简单的模糊查询
    // 倒序
    data.sort((a, b) => b.updateTime - a.updateTime)
    // 总条数
    const total = data.length
    // 切割对应页数的成员组成数组
    if (pageNum && pageSize) {
        data = data.splice((pageNum - 1) * pageSize, pageSize);
    }
    res.send({ code: 200, data, total, kindNameList, msg: "课程数据列表请求成功" })
})
// 处理修改课程基础信息
router.post("/reviseCourseInfoRequest", async (req, res) => {
    const { __id, sellingPrice, isSale, description } = req.body
    courseDB
        .updateOne({ __id }, { sellingPrice, isSale, description })
        .then(() => {
            res.send({ code: 400, msg: "课程信息修改成功" })
        })
        .catch(() => {
            res.status(400).send({ code: 400, msg: "课程信息修改失败" })
        })
})
// 处理上传来的封面图片，并更新数据
router.post("/reviseCourseCover", uploadCoverImageStorage.single("file"), async (req, res) => {
    const { _id } = req.body
    const { file } = req
    // 获取上传存在服务端目录下的图片路径
    let coverImageUrl = `/file/images/coverImage/${file.filename}`
    courseDB
        .updateOne({ _id }, { coverImage: coverImageUrl })
        .then(() => {
            res.send({ code: 200, msg: "课程封面更换成功" })
        })
        .catch(() => {
            res.status(400).send({ code: 400, msg: "课程封面更换失败" })
        })
})
// 处理上传来的视频数据，并更新数据
router.post("/reviseCourseVideo", uploadVideoStorage.single("file"), async (req, res) => {
    const { _id } = req.body;
    console.log("_id", _id)
    const { file } = req;
    let videoUrl = `/file/videos/${file.filename}`;
    courseDB
        .updateOne({ _id }, { courseVideo: videoUrl })
        .then(() => {
            console.log("{ _id }",{ _id },"videoUrl",videoUrl)
            res.send({ code: 200, msg: "视频上传成功" })
        })
        .catch((err) => {
            console.log("err",err)
            res.status(400).send({ code: 400, msg: "视频上传失败" })
        })
})
module.exports = router