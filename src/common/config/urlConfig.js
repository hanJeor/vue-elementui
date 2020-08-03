/**
*    配置网络请求环境
*    @type{string}
*/

let env = process.env.VUE_APP_CURRENTMODE || 'DEV';
console.log("当前环境变量为：",env);

let GlobalConfig = {
    //development   开发环境
    DEV:{
        env:'DEV',
        baseUrl:'https://localhost:8080'
    },
    //user acceptance test  测试环境
    UAT:{
        env:'UAT',
        baseUrl:'https://localhost:8080'
    },
    //production    生产环境
    PROD:{
        env:'PROD',
        baseUrl:'https://localhost:8080'
    }
}

// DEV： development                 开发

// SIT： System Integrate Test       系统整合测试（内测）
// UAT： User Acceptance Test        用户验收测试
// PET： Performance Evaluation Test 性能评估测试（压测）

// SIM： simulation                  仿真
// Mir： Mirror                      镜像 同仿真

// ABT:  ABTest                      灰度
// PROD：production                  产品/正式/生产

let urlConfig = GlobalConfig[env];
export {
    urlConfig,
    env
}