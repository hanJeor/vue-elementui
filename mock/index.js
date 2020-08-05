//首先引入mock
const Mock = require('mockjs');
// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if(process.env.NODE_ENV !== 'production'){


    require("./login");//用户登录
    //设置拦截ajax请求的响应时间
    Mock.setup ({
        timeout:'200-600'
    })
}