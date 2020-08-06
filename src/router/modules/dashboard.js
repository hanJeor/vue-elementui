import Layout from '@/components/layout/index.vue'
import Dashboard from "@/views/dashboard"
import Article from "@/views/article"
const dashboard = [{
    path: '/',
    redirect: '/dashboard',
    name: "Home",
    component: Layout,
    children: [
        {
            path: 'dashboard',
            name: '首页',
            component: Dashboard,
            redirect:'/dashboard/dashboard1',
            meta:{title:"首页"},
            children: [
                { path: 'dashboard1', name: '首页1', component: Dashboard, meta:{title:"首页1"} }, //需要被缓存的页面
                {
                    path: 'dashboard2',
                    name: '首页2',
                    component: Dashboard,
                    redirect:'/dashboard/dashboard2/dashboard21',
                    meta:{title:"首页2"},
                    children: [
                        { path: 'dashboard21', name: '首页21', component: Dashboard, meta:{title:"首页21"}},
                        { path: 'dashboard22', name: '首页22', component: Dashboard, meta:{title:"首页22"}},
                    ]
                },
            ]
        },
        { path: '/article', name: '文章', component: Article, meta:{title:"文章"}},
        { path: '/SysLog', name: '系统日志', component: Dashboard, meta:{title:"系统日志"}},
    ]
}];
export default dashboard;