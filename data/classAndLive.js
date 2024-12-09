const liveDB = require("../dbSchemas/live")
const classDB = require("../dbSchemas/class")

// 创建live直播数据时, 将直播id存入到class表数据中, 进行关联
liveDB.create({
    liveList: [
        {
            // 课程名(阶段名),
            courseName: "web前端进阶框架",
            // 班期名称
            className: "web-前端进阶框架-许鑫",
            // 直播标题
            liveTitle: "01-认识Node",
            // 直播时间
            liveTime: new Date(2023, 6, 1, 20, 30) - 0,
            // 直播时长(分钟数)
            liveDuration: 120,
            // 老师
            teacher: "许鑫"
        },
        {
            courseName: "web前端进阶框架",
            className: "web-前端进阶框架-许鑫",
            liveTitle: "02-认识Vue",
            liveTime: new Date(2023, 6, 2, 20, 30) - 0,
            liveDuration: 120,
            teacher: "许鑫"
        }
    ]
}).then(res => {
    // 拿到live的_id存入class表的refLiveId字段,并新建班期数据
    classDB.create({
        courseName: "web前端进阶框架",
        className: "web-前端进阶框架-许鑫",
        enrollTime: [new Date(2023, 4, 1, 20, 30) - 0, new Date(2023, 5, 1, 20, 30) - 0],
        studentNum: 50,
        updatePeople: "许鑫",
        updateTime: Date.now(),
        refLiveId: res._id,  // 存储该班期对应的直播数据的id值
    })
})


liveDB.create({
    liveList: [
        {
            // 课程名(阶段名),
            courseName: "web前端进阶框架",
            // 班期名称
            className: "web-前端进阶框架-路遥",
            // 直播标题
            liveTitle: "01-认识Node",
            // 直播时间
            liveTime: new Date(2023, 6, 1, 20, 30) - 0,
            // 直播时长(分钟数)
            liveDuration: 120,
            // 老师
            teacher: "路遥"
        },
        {
            courseName: "web前端进阶框架",
            className: "web-前端进阶框架-路遥",
            liveTitle: "02-认识Vue",
            liveTime: new Date(2023, 6, 2, 20, 30) - 0,
            liveDuration: 120,
            teacher: "路遥"
        }
    ]
}).then(res => {
    classDB.create({
        courseName: "web前端进阶框架",
        className: "web-前端进阶框架-路遥",
        enrollTime: [new Date(2023, 5, 1, 20, 30) - 0, new Date(2023, 6, 1, 20, 30) - 0],
        studentNum: 50,
        updatePeople: "路遥",
        updateTime: Date.now(),
        refLiveId: res._id,  // 存储该班期对应的直播数据的id值
    })
})


liveDB.create({
    liveList: [
        {
            // 课程名(阶段名),
            courseName: "web前端进阶框架",
            // 班期名称
            className: "web-前端进阶框架-丸子",
            // 直播标题
            liveTitle: "01-认识Node",
            // 直播时间
            liveTime: new Date(2023, 6, 1, 20, 30) - 0,
            // 直播时长(分钟数)
            liveDuration: 120,
            // 老师
            teacher: "丸子"
        },
        {
            courseName: "web前端进阶框架",
            className: "web-前端进阶框架-丸子",
            liveTitle: "02-认识Vue",
            liveTime: new Date(2023, 6, 2, 20, 30) - 0,
            liveDuration: 120,
            teacher: "丸子"
        }
    ]
}).then(res => {
    classDB.create({
        courseName: "web前端进阶框架",
        className: "web-前端进阶框架-丸子",
        enrollTime: [new Date(2023, 6, 1, 20, 30) - 0, new Date(2023, 7, 1, 20, 30) - 0],
        studentNum: 50,
        updatePeople: "丸子",
        updateTime: Date.now(),
        refLiveId: res._id,  // 存储该班期对应的直播数据的id值
    })
})