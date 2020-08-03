//首先引入mock
const Mock = require('mockjs');

require("./login");//用户登录
//设置拦截ajax请求的响应时间
Mock.setup ({
    timeout:'200-600'
})