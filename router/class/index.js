const express = require("express")
const router = express.Router()
const classDB = require("../../dbSchemas/class")
const liveDB = require("../../dbSchemas/live")

// 请求获取班期列表数据(携带它对应的直播数据)
router.get("/classList", async (req, res) => {

    // 页码  每页条数  招生时间范围 班期名
    const {pageCode, pageSize, enrollTime, className} = req.query
    
    // 联表查询数据
    let data = await classDB.find().populate({path: "refLiveId", model: liveDB})
    
    if(data.length <= 0) return res.status(400).send({code: 400, msg: "不存在班期数据"})

    // 筛选招生时间范围内的数据
    if(enrollTime && enrollTime.length>=2){
        const startTime = enrollTime[0] - 0
        const endTime = enrollTime[1] - 0
        data = data.filter(item => startTime >= item.enrollTime[0] && endTime <= item.enrollTime[1])
    }
    
    // 筛选班期. 模糊查询
    if(className) data = data.filter(item => item.className.includes(className))

    // 倒序
    data.sort((a, b) => b.updateTime - a.updateTime)

    // 总条数
    const total = data.length

    // 切割对应页数的成员组成数组
    data = data.splice((pageCode - 1) * pageSize, pageSize)

    res.send({ code: 200, data, total, msg: "班期列表请求成功" })
})

module.exports = router