const courseDB = require("../dbSchemas/course")
// 预添加基础数据

// course表

courseDB.create({
    kindName: 'web',
    // 课程名称
    courseName: "web前端基础核心语法",
    // 售价
    sellingPrice: 2000,

    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授html+css+js',
    // 封面图片
    coverImage: '/file/images/coverImage/web1.png',
    
    courseVideo: '',
    updateTime: Date.now()
})
courseDB.create({
    updateTime: Date.now(),
    kindName: 'web',
    // 课程名称
    courseName: "web前端进阶框架",
    // 售价
    sellingPrice: 5000,

    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授Node.js + VUE3.js + React.js + 开发微信小程序',
    // 封面图片
    coverImage: '/file/images/coverImage/web2.png',
    courseVideo: '',
})

courseDB.create({
    updateTime: Date.now(),
    kindName: 'web',
    // 课程名称
    courseName: "web前端设计模式",
    // 售价
    sellingPrice: 9000,

    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授webpack、Git、TypeScript、算法、设计模式',
    // 封面图片
    coverImage: '/file/images/coverImage/web3.png',
    courseVideo: '',
})

courseDB.create({
    updateTime: Date.now(),
    kindName: 'Python',
    // 课程名称
    courseName: "Python基础核心语法",
    // 售价
    sellingPrice: 2000,

    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授Python基础内容',
    // 封面图片
    coverImage: '/file/images/coverImage/py1.jpg',
    courseVideo: '',
})
courseDB.create({
    updateTime: Date.now(),
    kindName: 'Python',
    // 课程名称
    courseName: "Python全栈开发",
    // 售价
    sellingPrice: 8000,

    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授Python进阶内容',
    // 封面图片
    coverImage: '/file/images/coverImage/py2.jpg',
    courseVideo: '',
})

// courseDB.create({
//     updateTime: Date.now(),
//     kindName: 'java',
//     // 课程名称
//     courseName: "Java基础",
//     // 售价
//     sellingPrice: 1000,

//     // 更新人
//     updatePeople: "丸子",
//     // 课程描述
//     description: '主要教授Java基础内容',
//     // 封面图片
//     coverImage: '/file/images/coverImage/04.png'
// })

// courseDB.create({
//     updateTime: Date.now(),
//     kindName: 'java',
//     // 课程名称
//     courseName: "Java高级",
//     // 售价
//     sellingPrice: 7000,

//     // 更新人
//     updatePeople: "丸子",
//     // 课程描述
//     description: '主要教授Java高级内容',
//     // 封面图片
//     coverImage: '/file/images/coverImage/04.png'
// })

courseDB.create({
    updateTime: Date.now(),
    kindName: '日语',
    // 课程名称
    courseName: "日语发音班",
    // 售价
    sellingPrice: 500,

    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授日语五十音',
    // 封面图片
    coverImage: '/file/images/coverImage/Japanese1.jpg',
    courseVideo: '',
})

courseDB.create({
    updateTime: Date.now(),
    kindName: '日语',
    // 课程名称
    courseName: "日语初级班",
    // 售价
    sellingPrice: 2180,

    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授日语初级语法内容',
    // 封面图片
    coverImage: '/file/images/coverImage/Japanese2.png',
    courseVideo: '',
})
courseDB.create({
    updateTime: Date.now(),
    kindName: '日语',
    // 课程名称
    courseName: "日语零基础直达N3班",
    // 售价
    sellingPrice: 4000,
    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授日语0基础-N3的内容',
    // 封面图片
    coverImage: '/file/images/coverImage/Japanese3.jpg',
    courseVideo: '',
})
courseDB.create({
    updateTime: Date.now(),
    kindName: '日语',
    // 课程名称
    courseName: "日语零基础直达N1班",
    // 售价
    sellingPrice: 9380,
    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授日语0基础-N1的内容',
    // 封面图片
    coverImage: '/file/images/coverImage/Japanese4.png',
    courseVideo: '',
})

courseDB.create({
    updateTime: Date.now(),
    kindName: '原画',
    // 课程名称
    courseName: "绘画基础班",
    // 售价
    sellingPrice: 2000,
    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授绘画基础内容',
    // 封面图片
    coverImage: '/file/images/coverImage/draw1.jpg',
    courseVideo: '',
})
courseDB.create({
    updateTime: Date.now(),
    kindName: '原画',
    // 课程名称
    courseName: "角色原画进阶班",
    // 售价
    sellingPrice: 4100,
    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授角色原画',
    // 封面图片
    coverImage: '/file/images/coverImage/draw2.png',
    courseVideo: '',
})

courseDB.create({
    updateTime: Date.now(),
    kindName: '原画',
    // 课程名称
    courseName: "厚涂头像班",
    // 售价
    sellingPrice: 999,
    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授厚涂头像',
    // 封面图片
    coverImage: '/file/images/coverImage/draw3.png',
    courseVideo: '',
})
courseDB.create({
    updateTime: Date.now(),
    kindName: '原画',
    // 课程名称
    courseName: "二次元绘制",
    // 售价
    sellingPrice: 4100,
    // 更新人
    updatePeople: "丸子",
    // 课程描述
    description: '主要教授二次元绘画',
    // 封面图片
    coverImage: '/file/images/coverImage/draw4.png',
    courseVideo: '',
})