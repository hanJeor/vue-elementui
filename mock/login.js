import Mock from 'mockjs'
const data = {
    'msg':"登录成功"
};
Mock.mock('/api/login','post',data)

export default Mock;