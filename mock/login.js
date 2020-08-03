import Mock from 'mockjs'
const login = () => {
    let response = Mock.mock({
        'msg':"登录成功"
    })
    return response;
};
Mock.mock('/mock/login',login);