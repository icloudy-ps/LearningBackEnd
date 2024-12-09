/*
 * @Author: changaowu
 * @Date: 2024-12-05 16:07:11
 * @LastEditors: changaowu
 * @LastEditTime: 2024-12-09 14:41:37
 * @Description: file content
 * @FilePath: \back_end\constant\index.js
 */
// mango数据库连接地址
const MONGO_DB_URL = "mongodb://mongodb:27017/system_cms"; // 替换为 MongoDB 容器的名称
const SECRET_KEY = "my-secret-key";

module.exports = {
    MONGO_DB_URL,
    SECRET_KEY,
};
