import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/Login.vue"
import Layout from './components/layout/index.vue'
import Dashboard from "./views/dashboard"
import Article from "./views/article"


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        /*{
            path: '/',
            name: 'layout',
            component: Home
        },*/
        /*{
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: Layout,
            children: [
                {path: 'Dashboard', name: '首页', component: Dashboard, },
                {path: 'article', name: '文章', component: Article, },
            ]
        },*/
        {
            path:'/',
            redirect:'/dashboard',
            name:"Home",
            component:Layout,
            children:[
                {
                    path:'dashboard',name:'首页',component:Dashboard,
                    children:[
                        {path:'dashboard1',name:'首页1',component:Dashboard,meta: {keepAlive: true,title: '首页1'}}, //需要被缓存的页面
                        {path:'dashboard2',name:'首页2',component:Dashboard,children:[
                                {path:'dashboard21',name:'首页21',component:Dashboard,},
                                {path:'dashboard22',name:'首页22',component:Dashboard,},
                            ]},
                    ]
                },
                {path:'article',name:'文章',component:Article,},
                {path:'/SysLog',name:'系统日志',component:Dashboard},
            ]
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
