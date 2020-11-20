<template>
  <div class="my-page">
    <div class="top-header">
      <div class="top-header-avatar" @click="token?gotoInfo():()=>{}">
        <img :src="IMAGE_URL + (data&&data.avatar_image)" alt="" />
      </div>
      <div v-if="token" class="top-header-user" @click="gotoInfo">
        <h3 class="">{{data&&data.realName||'--'}}</h3>
        <p>{{data&&data.phone||'--'}}</p>
      </div>
      <div v-else class="top-header-user">
         <h3 class="">未登录</h3>
      </div>
    </div>
    <Loading v-if="loading"/>
    <div class="content-main" v-else>
      <van-cell-group>
        <van-cell title="我的红包" :value="hongbao?hongbao:''" :to="token?'/hongbao':'/login'" is-link icon="bill-o"/>
        <van-cell title="我的地址" is-link icon="location-o" :to="token?'/addrlist':'/login'"/>
        <van-cell title="我的收藏" is-link icon="star-o" :to="token?'/favorite':'/login'"/>
        <van-cell title="常见问题" is-link icon="notes-o" :to="token?'/problem':'/login'"/>
        <van-cell title="客服咨询" is-link icon="service-o" :to="token?'/customer':'/login'"/>
        <van-cell v-if="token" title="退出登录" is-link icon="upgrade" @click="logout"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script lang="ts">
import Cookies from 'js-cookie'
// @ts-ignore
import {getUserInfo} from '@/service'
// @ts-ignore
import {TOKEN, USERID} from '@/utils/storage'
// @ts-ignore
import { IMAGE_URL } from '@/config'
import { Component, Vue, Watch } from "vue-property-decorator";

const Loading = () => import('@/components/Loading/index.vue')

@Component({
  components: { Loading },
  computed: {
    token () {
      return Cookies.get(TOKEN) || null
    }
  },
  created () {
    if (this.token) {
      this.getUserInfo()
    }
  }
})
export default  class My extends Vue {
  IMAGE_URL: string = IMAGE_URL
  data: any = null
  loading: boolean = false
  hongbao: any = 0
  async getUserInfo () {
    this.loading = true
    let {erron, data, message} = await getUserInfo({_id: Cookies.get(USERID)})
    this.loading = false
    if (erron === 0) {
      this.data = data
    } else {
      this.$notify({type: 'warning', message})
    }
  }
  logout () {
    this.$dialog.confirm({
      title: '用户提示',
      message: '是否退出登录？'
    }).then(() => {
      Cookies.remove(TOKEN);
      Cookies.remove(USERID);
      location.href='/'
    }).catch(() => {});
  }
  gotoInfo () {
    this.$router.push({name: 'info'})
  }
}
</script>
<style lang="less" scoped>
.my-page{
  .top-header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('~@/assets/images/mybackground.png');
    background-size: cover;
    &-avatar{
      width: 80px;
      height: 80px;
      margin-bottom: 10px;
      margin-top:20px;
      border-radius: 100%;
      border: 5px solid rgba(255,255,255,.5);
      img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    &-user{
      padding-bottom: 20px;
      text-align: center;
      h3{
        font-weight: normal;
        font-size: 16px;
      }
      p{
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>