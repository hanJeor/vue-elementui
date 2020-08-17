import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/views/Login.vue"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(Router)

// you do not need `import app from './modules/app'`
// it will auto require all router module from modules file
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules=value.default.concat(modules)
  return modules
}, {})
//
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    ...modules.splice(0,modules.length-1)
  ]
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    if(to.path === '/login'){
        sessionStorage.removeItem('user');
    }
    var user = sessionStorage.getItem('user');
    if(!user && to.path !== '/login'){
        next({
            path: '/login'
        })
    }else{
        next();
    }
})

router.afterEach(() => {
  NProgress.done()
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
//使用严格的路径，来进行缓存页面(操作简单）
/*router.beforeEach((to, from, next) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  if (toDepth < fromDepth) {
    from.meta.keepAlive = false
    to.meta.keepAlive = true
  }
  next()
})*/
export default router