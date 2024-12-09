const studentDB = require("../dbSchemas/student")

// 随机生成手机号
const randomPhone = () => {
    let str = "1"
    // 随机拼接10个数字
    for(let i = 0; i < 10; i++){
        str += Math.floor(Math.random() * 10)
    }
    return Number(str)
}

// 定义模板数据（类别>阶段名>班期名）, 随机组合模板内的数据生成多条
const arr = [
    {
        kindName: "Python",
        courseName: "Python基础核心语法",
        className: [
            "python-核心语法基础班-look",
            "python-核心语法基础班-闹闹",
            "python-核心语法基础班-阿言",
            "python-核心语法基础班-莫扎特",
        ]
    },
    {
        kindName: "Python",
        courseName: "Python进阶",
        className: [
            "python-全栈开发-look",
            "python-全栈开发-闹闹",
            "python-全栈开发-阿言",
            "python-全栈开发-莫扎特",
        ]
    },
    {
        kindName: "web",
        courseName: "web前端基础核心语法",
        className: [
            "JavaScript核心语法-丸子",
            "JavaScript核心语法-朱雀",
            "JavaScript核心语法-路遥",
            "JavaScript核心语法-许鑫",
        ]
    },
    {
        kindName: "web",
        courseName: "web前端进阶框架",
        className: [
            "web-前端进阶框架-丸子",
            "web-前端进阶框架-朱雀",
            "web-前端进阶框架-路遥",
            "web-前端进阶框架-许鑫",
        ]
    },
    {
        kindName: "web",
        courseName: "web前端设计模式",
        className: [
            "web-设计模式-丸子",
            "web-设计模式-阿飞"
        ]
    }
]

const data = []

// 循环生成500条数据
for(let i = 0; i < 500; i++){
    const phone = randomPhone()
    const randomNum1 = Math.floor(Math.random() * arr.length)
    const arrItem = arr[randomNum1] // 随机取1个数组成员
    const randomNum2 = Math.floor(Math.random() * arrItem.className.length)
    const randomClassName = arrItem.className[randomNum2] // 随机取1个班期名称
    data.push({
        phone,
        kindName: arrItem.kindName,
        courseName: arrItem.courseName,
        className: randomClassName,
        updatePeople: "管理员",
        updateTime: Date.now(), // 当前时间戳
        detailInfo: {
            phone
        }
    })
}
studentDB.create(...data)