<template>
    <div id="login">
        <vue-particles
            color="#fff"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="triangle"
            :particleSize="4"
            linesColor="#fff"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="lizi"
        >
        </vue-particles>
        <el-form ref="loginForm"
                 :model="form"
                 :rules="rules"
                 label-width="80px"
                 class="login-box">
            <h3 class="login-title">欢迎登录</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text"
                          placeholder="请输入账号"
                          auto-complete="off"
                          v-model="form.username"
                          @keyup.enter.native="keyupClick"
                >
                <!--<i slot="prefix" class="icon iconfont icon-xingmingyonghumingnichengcopy"></i>-->
                    <template slot="prepend"><span class="fa fa-user fa-lg" style="width: 13px"></span></template>
                </el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
                <el-input :type="pwdType"
                          placeholder="请输入密码"
                          auto-complete="off"
                          ref="mima"
                          v-model="form.password"
                          @keyup.enter.native="onSubmit('loginForm')"
                >
                <!--<i slot="prefix" class="icon iconfont icon-mima"></i>-->
                    <template slot="prepend"><span class="fa fa-lock fa-lg" style="width: 13px"></span></template>
                    <template slot="suffix"><span class="password-eye" @click="showPassword" :class="eyeType"></span></template>
                </el-input>
              </el-form-item>
            <el-form-item>
                <el-checkbox v-model="rememberme" class="rememberme">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item style="width:100%;">
            <el-button type="primary"
                       :loading="logining"
                       v-on:click="onSubmit('loginForm')">登录</el-button>
        <el-button type="info" v-on:click="reset('loginForm')">重置</el-button>
        </el-form-item>

        </el-form>
        <el-dialog title="温馨提示"
                   :visible.sync="dialogVisible"
                   width="30%"
                   :before-close="handleClose">
          <span style="font-size:14px;">请输入账号和密码</span>
          <span slot="footer"
                class="dialog-footer">
            <el-button type="primary"
                       @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="温馨提示"
               :visible.sync="dialogShow"
               width="30%"
               :before-close="handleClose">
        <span style="font-size:14px;">账号或密码不正确，请重新输入！</span>
        <span slot="footer"
            class="dialog-footer">
            <el-button type="primary"
                   @click="dialogShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import axios from "axios";
    import {apiUtils} from "../common/apiUtils"
export default {
    name: "Login",
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rememberme:false,
            logining:false,
            // 表单验证，需要在 el-form-item 元素中增加 prop 属性
            rules: {
                username: [{ required: true, message: "账号不可为空", trigger: "blur" }],
                password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
            },

            // 对话框显示和隐藏
            dialogVisible: false,
            dialogShow:false,
            pwdType: 'password',
            eyeType: 'fa fa-eye-slash fa-lg',
        };
    },
    methods: {
      //记住密码
        /*setCookie(name, pass, days){
            let expire = new Date()
            expire.setDate(expire.getDate() + days)
            document.cookie = `C-username=${name};expires=${expire}`
            document.cookie = `C-password=${pass};expires=${expire}`
        },*/
        setCookie(name, pass, days){
          let expire = new Date()
          expire.setDate(expire.getDate() + days)
          document.cookie = `C-username=${encodeURIComponent(name)};expires=${expire.toGMTString()}`
          document.cookie = `C-password=${encodeURIComponent(pass)};expires=${expire.toGMTString()}`
        },
        getCookie(){
            var cookies = decodeURIComponent(document.cookie)
            // var cookies = document.cookie
            if(cookies.length){
                let arr = cookies.split(';')
                for(let i=0; i<arr.length; i++){
                    let arr2 = arr[i].split('=')
                    console.log("arr2:",arr2)
                    if(arr2[0] === 'C-username'){
                        this.form.username = arr2[1]
                        console.log("获取到的name：",arr2[1])
                    }else if(arr2[0] === 'C-password'){
                        this.form.password = arr2[1]
                        console.log("获取到的password：",this.form.password)
                        this.rememberme = true
                    }
                }
            }
        },
        // 修改为空，天数为-1
        deleteCookie(){
            this.setCookie('', '', -1);
        },
        // 显示密码
        showPassword() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
                this.eyeType = 'fa fa-eye fa-lg'
            } else {
                this.pwdType = 'password'
                this.eyeType = 'fa fa-eye-slash fa-lg'
            }
        },
        //用户名输入完成回车密码框获取焦点
        keyupClick() {
            this.$nextTick(()=>{
                this.$refs.mima.focus()
            })
        },
        onSubmit(formName) {
            if(this.rememberme){
                this.setCookie(this.form.username, this.form.password, 1)
                // this.setCookie(this.form.username, this.form.password, 7)
            }else{
                this.deleteCookie()
            }
            // 为表单绑定验证功能
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.logining = true;
                    let params = this.form;
                    if(this.form.username === 'admin' &&
                    this.form.password === '123456'){
                        this.$http('login',params).then((res)=>{
                            if(res != null){
                                if(res.errMsg === 0) {
                                    let data = res.msg;
                                    this.$message.success(data);
                                }
                            }else{
                                this.$message.error('网络请求错误');
                            }
                        })
                        this.logining = false;
                        sessionStorage.setItem('user', this.form.username);
                        // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                        this.$router.push("/");
                    } else {
                        this.logining = false;
                        this.dialogShow = true;
                        return false;
                    }
                }else{
                    this.logining = false;
                    this.dialogVisible = true;
                    return false;
                }
            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        reset(formName){
            // this.form.username="";
            // this.form.password="";
            this.$refs[formName].resetFields();
        },
    },
    // 页面载入后读取cookie
    mounted(){
        this.getCookie()
    }
};
</script>

<style lang="scss" scoped>
#login {
    background-color: #2b4b6b;
    height: 100%;
    overflow: hidden;
    position:relative;
}
#login .lizi{
    width:100%;
    height:100%;
}
.login-box {
    border: 1px solid #dcdfe6;
    width: 350px;
    //   margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-color:white;
    position:fixed;
    left:50%;
    top:50%;
    margin-left:-211px;
    margin-top:-182px;
}

.login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
}
label.el-checkbox.rememberme {
    margin: 0px;
    text-align: left;
    float:right;
}
#login .password-eye{
    line-height:40px;
}
</style>