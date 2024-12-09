const mongoose = require("mongoose")
const { MONGO_DB_URL } = require("../../constant/index")
mongoose
    .connect(MONGO_DB_URL)
    .then(()=>console.log("数据库连接成功"))
    .catch(()=>console.log("数据库连接失败"))

module.exports = mongoose