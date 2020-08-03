import {urlConfig} from './config/urlConfig';
const baseUrl = `${urlConfig.baseUrl}`;

const mockUrl = `/mock`;

/**
 *拼接请求接口得url
 */
let apiUtils = {}
//====登录====
//mock数据
apiUtils.login = `${mockUrl}/login`;//用户登录
export {
    apiUtils
}