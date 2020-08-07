<!--
<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Container from "../components/Container"
export default {
  name: 'layout',
  components: {
      Container,
  }
}
</script>
-->
<template>
    <div class="app">
        <el-container>
            <el-aside class="app-side app-side-left" :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
                <el-scrollbar wrap-class="scrollbar-wrapper" :vertical="true">
                    <Sidebar :collapse="isCollapse" :routes="$router.options.routes[1].children" />
                </el-scrollbar>
            </el-aside>
            <el-container>
                <el-header class="app-header">
                    <div style="width: 60px; cursor: pointer;" @click.prevent="toggleSideBar">
                        <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
                        <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
                    </div>
                    <Breadcrumb></Breadcrumb>
                    <div class="app-header-userinfo">
                        <el-dropdown trigger="hover" :hide-on-click="false">
                            <span class="el-dropdown-link">
                                {{ username }}
                                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>我的消息</el-dropdown-item>
                                <el-dropdown-item>设置</el-dropdown-item>
                                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <!--  -->
                <tags-view />
                <el-main class="app-body">
                    <template>
                        <!--<transition name="fade-transform" mode="out-in">-->
                            <!--<router-view />-->
                            <keep-alive>
                               <!--缓存组件-->
                                <router-view v-if="$route.meta.keepAlive"/>
                            </keep-alive>
                            <!--非缓存组件-->
                            <router-view v-if="!$route.meta.keepAlive"/>
                        <!--</transition>-->
                    </template>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Sidebar from '@/components/layout/Sidebar'
import Breadcrumb from '@/components/layout/Breadcrumb'
import TagsView from '@/components/layout/TagsView'
export default {
    name: 'Home',
    components: {
        Sidebar,
        Breadcrumb,
        TagsView
    },
    data() {
        return {
            username: '',
            isCollapse: false,
            defaultActive: 'Dashboard'
        }
    },
    methods: {
        toggleSideBar() {
            this.isCollapse = !this.isCollapse
        },
        logout: function() {
            this.$confirm('确认退出?', '提示', {})
                .then(() => {
                    sessionStorage.removeItem('user');
                    this.$router.push('/login');
                })
                .catch(() => {});
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    mounted: function() {
        let user = sessionStorage.getItem('user');
        if (user) {
            this.username = user;
        }
    },
}
</script>
<style lang="scss" scoped>
.app-side {
    transition: width 300ms;
}

.app-body {
    overflow: hidden;
    overflow-y: auto;
}

.tags-view-container {
    text-align: left;
}
</style>