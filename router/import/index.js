const express = require("express")
const router = express.Router()
const {uploadExcelStorage} = require("../../middlewares/uploadFiles/index")
const path = require("path")
const xlsx = require('node-xlsx')  //解析.xlsx文件
const studentDB = require("../../dbSchemas/student")
const courseClassification = require("../../json/courseClassification.json")
const importDB = require("../../dbSchemas/import")


// 处理客户端要下载模板文件的请求， /api/import/downloadTemplate
router.get("/downloadTemplate", (req, res) => {
    res.download(path.join(__dirname, "../../upload/template.xlsx"), err => {
        if (err) throw err
    })
})

// 处理客户端上传导入学员的表格文件 /api/import/studentTable
router.post("/studentTable", uploadExcelStorage.single("file"), async (req, res) => {
    /*
    1.批量导入学员的表格表头必须标准（必须按照模板，因此需要给客户端提供一个excel.xlsx文件模板）。
    2.当用户上传了表格文件后:
        1.校验数据是否符合规范
            数据格式规范：手机号必须是11位，年龄必须是数字
            数据内容值是否符合系统里定好的数据
        2.取出表格中的所有数据，给数据组合上字段名（组合数据）
        3.将规范好的用户数据存储到数据库里
        4.给出批量导入数据的反馈
            1.全部导入成功
            2.失败/部分成功部分失败，给出反馈，明确告诉使用者哪里有问题
*/
    const { file, userInfo } = req    //上传的文件对象
    // 取第一张子表的数据，过滤长度为0的数据数组（成员）
    const arr = xlsx.parse(file.path)[0].data
    // console.log(arr);

    // 定义可以将中文标题转为英文标题的对象
    const tableHeaderProperty = {
        '手机号': "phone",
        '课程类别': "kindName",
        '课程阶段': "courseName",
        '班期名': "className",
        '姓名': "name",
        '年龄': "age",
        '微信': "wechat",
        '性别': "sex",
        '所属城市': "city",
        '学历': "education"
    }
    // 取出表头(标题), 将表头数组中的数据替换英文(符合数据库存储的字段)
    const tableHeaderArr = arr[0].map(item => tableHeaderProperty[item.replace("*", "")])

    // 取出所有的学员的数据,取出从下标1位置起往后的所有成员
    const allStudentDataArr = arr.slice(1)
    const total = allStudentDataArr.length
    // 如果total为-，说明表中不存在数据
    if (!total) return res.status(400).send({ code: 400, msg: "请不要上传空数据表" });



    // 格式化所有学院数据，组合成符合数据库字段要求的的键值对数据形式的数据
    let formatStudentDataArr = allStudentDataArr.map((valueItem, i) => {
        let tempStudent = {}
        tableHeaderArr.forEach((propItem, j) => {
            // 当前的字段名（标题） = 学员数据数组的第j个值
            tempStudent[propItem] = valueItem[j]
        })
        return tempStudent
    })
    // console.log(formatStudentArr);

    // 校验数据规范
    for (let i = 0, len = formatStudentDataArr.length; i < len; i++) {
        let item = formatStudentDataArr[i]

        // 1.校验必填项是否为空
        if (!(item.phone && item.kindName && item.courseName && item.className)) {
            return res.status(400).send({ code: 400, msg: "必填项不能为空, 请按照模板要求填写" })
        }

        // 2.校验手机号必须为11位数字
        if (!(/^(\d{11})$/.test(item.phone))) return res.status(400).send({ code: 400, msg: "手机号不符合格式要求" })

        // // 3.校验手机号不能与数据库中数据重复
        // let findOneResult = await studentDB.findOne({ phone: item.phone })
        // if (findOneResult) return res.status(400).send({ code: 400, msg: "同1个手机号不能重复导入" })


        // 4，表格中也不能重复

        // 5.年龄必须是数字
        if (item.age && Number.isNaN(Number(item.age))) return res.status(400).send({ code: 400, msg: "年龄必须是数字" })


        // 6.校验类别 阶段 班期是否存在系统中
        const kindNameObj = courseClassification.find(kItem => kItem.value === item.kindName)
        if (!kindNameObj) return res.status(400).send({ code: 400, msg: "系统不存在该课程类别, 请联系管理员" })
        // 阶段
        const courseNameObj = kindNameObj.courseName.find(cItem => cItem.value === item.courseName)
        if (!courseNameObj) return res.status(400).send({ code: 400, msg: "该类别下不存在该阶段, 请联系管理员" })
        // 班期
        const classNameStr = courseNameObj.className.find(cItem => cItem === item.className)
        if (!classNameStr) return res.status(400).send({ code: 400, msg: "该阶段下不存在该班期, 请联系管理员" })


    }

    // 校验结束
    //计数成功次数 和 失败次数
    let successCount = 0
    let importStudentErrorArr = []

    // 将数据存入数据库
    function addStudentData() {
        let addDataPromiseStateArr = []
        formatStudentDataArr.forEach(item => {
            addDataPromiseStateArr.push(new Promise((resolve, reject) => {
                studentDB.create(
                    {
                        phone: item.phone,
                        kindName: item.kindName,
                        courseName: item.courseName,
                        className: item.className,
                        origin: "后台导入",
                        updatePeople: userInfo.username,
                        updateTime: Date.now(),
                        detailInfo: {
                            phone: item.phone,
                            name: item.name,
                            wechat: item.wechat,
                            age: item.age,
                            sex: item.sex,
                            city: item.city,
                            education: item.education,
                        },

                    })
                    .then(() => {
                        //  存入成功
                        successCount++
                        resolve()
                    })
                    .catch(err => {
                        // 判断 / 分析 ：错误情况
                        console.log("当前数据存入失败", err);
                        item.reason = "当前手机号重复"   //失败的原因
                        importStudentErrorArr.push(item)

                        resolve()
                    })
            }))

        })
        return Promise.all(addDataPromiseStateArr)
    }

    // 监听到数据存储到数据库的操作全部执行完毕
    addStudentData()
        .then(() => {
            // 失败次数
            let defeatCount = importStudentErrorArr.length
            let fileName = file.originalname    //文件原名称
            let msg = `成功导入${successCount}条数据，失败${defeatCount}条数据`

            // 状态码 描述
            let status
            let statusDescription

            // 判断状态
            if(defeatCount === 0){      //全部成功
                status = 0
            }else if(defeatCount === total){      //全部失败
                status = 2
                statusDescription = "全部失败"
            }else{  //部分成功
                status = 1
                statusDescription = "部分成功"

            }

            // 将导入记录存储到import数据表中
            importDB.create({
                fileName,
                time: Date.now(),
                importPeople: userInfo.username,
                status,
                statusDescription,
                total,
                successCount,
                defeatCount,
                importStudentError: importStudentErrorArr,
            })
            res.send({ code: 200, msg })
        })
})


router.get("/importResultList",async (req,res)=>{
    // 页码，每条的页数
    const {pageNum,pageSize} = req.query
    let data = await importDB.find()
    if(data.length === 0) return res.send({code:400,msg:"未查询到数据"})

    // 按操作时间来倒序（时间）
    data.sort((a,b)=> b.time - a.time)
    //总数据条数
    let total = data.length
    // 从指定下标起，截取pageSize数量的成员
    data =  data.splice((pageNum - 1) * pageSize,pageSize)
    res.send({code:200, data, total})
})



module.exports = router