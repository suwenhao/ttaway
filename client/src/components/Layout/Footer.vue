<template>
    <van-tabbar
        :fixed="true"
        v-model="active"
        active-color="#222"
        inactive-color="#8e8e93"
        @change="onChange"
    >
        <van-tabbar-item name="home" icon="shop">首页</van-tabbar-item>
        <van-tabbar-item name="order" icon="graphic">订单</van-tabbar-item>
        <van-tabbar-item name="my" icon="manager">我</van-tabbar-item>
    </van-tabbar>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    @Component({
      mounted () {
        this.setDefaultPath()
      }
    })
    export default class Footer extends Vue {
      active: string = 'home'
      onChange(index) {
        this.$router.push({name: index})
      }
      setDefaultPath () {
        this.active = this.$route.name
      }
    }
</script>