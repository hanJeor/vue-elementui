//首先引入mock
const Mock = require(mockjs);

//设置拦截ajax请求的响应时间
Mock.settup ({
    timeout:'200-600'
})