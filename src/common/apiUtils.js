import {urlConfig} from './config/urlConfig';

const baseUrl = `${urlConfig.baseUrl}`;

/**
 *拼接请求接口得url
 */
let apiUtils = {}
//====登录====
//mock数据
apiUtils.login = `${baseUrl}/login`;//用户登录