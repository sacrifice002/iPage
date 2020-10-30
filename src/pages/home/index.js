import React from 'react'

function Home(){
    return (
        <div>
            前端：
            模板中心，这里展示模板页，写死两个模板数据
            选中模板时，向后端调用接口传参 protoId，后端生成app相关联数据并返回 appId 
            此时前端跳转至编辑器路由，并传参appId向后端获取app相关数据，例如modelList，并渲染
            编辑过程中……
            保存，生成appPath地址，向后端发起接口调用，app参数全量保存（modelList，事件，动效）
            预览，路由跳转至预览页面，传参:appPath?mode=preview，（http://localhost:9000/za-card?mode=preview），此过程为后端路由，后端校验app当前状态即返回
            发布，择时/立即，生成appPath地址 和 二维码(内网ip+port)

            服务端：
            接口：生成app
            渲染：预览/线上
            后管，数据/状态/[编辑|删除|下架(已上线)|调整发布时间]

            数据：
            流量、转化率、地域热力、应用有效访问时间等维度分析        
        </div>
    )
}

export default Home