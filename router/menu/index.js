const express = require("express")

const router = express.Router()

const permissionRoutes = [
    {
        path:"article",
        // component:()=>import("@/layout/Layout.vue")
        
    }
]

// /api/router/menu
router.get("/",(res,req)=>{
    res.setEncoding({code:200,msg:"管理员权限菜单路由",routes:JSON.stringify(permissionRoutes)})
})

module.exports = router