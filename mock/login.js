import Mock from 'mockjs'
const login = () => {
    let response = Mock.mock({
        'errMsg':0,
        'msg':"登录成功"
    })
    return response;
};
Mock.mock('/mock/login',login);