const mongoose = require("../middlewares/mongoose")
const Schema = mongoose.Schema

// 直播表
const liveScheme = new Schema({
  
    liveList:[
        {
            // 课程名（阶段名）
            courseName:{
                type:String,
                require:true
            },
            // 班期名
            className:{
                type:String,
                require:true,
                unique:true
            },
            
            // 直播标题
            liveTitle:{
                type:String,
                require:true
            },
            // 直播时间
            liveTime:{
                type:Number,
                require:true
            },
            // 直播时长
            liveDuration:{
                type:Number,
                default:0
            },
            // 老师
            teacher:{
                type:String,
                require:true
            }
        }
    ]
})
module.exports = mongoose.model("live",liveScheme)