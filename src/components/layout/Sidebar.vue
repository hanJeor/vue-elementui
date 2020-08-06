<!--
子组件传入:
1.barIdx: 当前路由的索引，用来定位子菜单
2.subroute: 路由对象
3.fatherpath: 父路径，如 /、 /a/b
-->
<template>
    <div>
        <div class="app-side-logo">
            <img src="@/assets/logo.png"
                 :width="collapse ? '60' : '60'"
                 height="60"
                 alt="">
        </div>
        <el-menu class="el-menu-vertical-demo"
                :default-active="defaultActive"
                :collapse-transition="false"
                router
                :collapse="collapse">
            <SidebarItem v-for="(item,idx) in routes"
                         :subroute="item"
                         :fatherpath="fatherPath"
                         :barIdx="idx" :key="idx" />


        </el-menu>
    </div>
</template>

<script>
    import SidebarItem from "./SidebarItem"
    export default {
        name: "Sidebar",
        components:{
            SidebarItem
        },
        props:{
            collapse:{
                type:Boolean
            },
            routes:{
                type:Array
            }
        },
        computed:{
            //首次进入页面时展开当前页面所属菜单
            defaultActive(){
                return this.$route.path
            },
            fatherPath(){
                //这里直接获取路由配置得'/'项
                return this.$router.options.routes[1].path
            }
        }
    }
</script>

<style scoped>

</style>