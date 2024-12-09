// projectData/feature
// projectData/version
const express = require("express")
const router = express.Router()
const path = require("path")
// 项目的功能数据   /projectData/version
router.get("/feature",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../json/projectFeature.json"))
})

//项目版本数据 /projectData/version
router.get("/version",(req,res)=>{
    res.sendFile(path.join(__dirname,"../../json/projectVersion.json"))
})

// 静态数据


module.exports = router
