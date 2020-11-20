<template>
  <div class="address-page">
    <Header class="header-warp" @return="headerReturn">我的地址</Header>
    <div class="noz" v-if="!show&&list.length===0">暂无配送地址</div>
    <div class="btn-box" v-if="!show&&list.length===0">
      <van-button @click="onAdd" block round  type="danger">新增地址</van-button>
    </div>
    <div class="loading-box" v-if="show">
      <Loading/>
    </div>
    <van-address-list
      v-if="list.length>0&&!show"
      :list="list"
      v-model="chosenAddressId"
      :switchable="type?true:false"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="selectAddress"
    />
  </div>
</template>
<script lang="ts">
import Cookies from 'js-cookie'
// @ts-ignore
import { getArealist } from '@/service'
// @ts-ignore
import StorageModel, {ADDRESS, ADDRESSPAY, SELECTADDRESS, TOKEN, USERID} from '@/utils/storage'
// component
import Header from '@/components/Layout/Header.vue'
import {Component, Vue} from 'vue-property-decorator'

const Loading = () => import('@/components/Loading/index.vue')
const Storage = new StorageModel()

@Component({
  components: {
    Header,
    Loading
  },
  computed: {
    token () {
      return Cookies.get(TOKEN) || null
    }
  },
  created () {
    if (!this.token) {
      this.$router.push({name: 'login'})
      return
    }
    if (this.$route.name === 'addrlist') {
      Storage.remove(ADDRESSPAY)
    }
    this.type = this.$route.params.type
    this.getArealist()
  }
})
export default class Footer extends Vue {
  chosenAddressId: string = '1'
  show: boolean = true
  type = null
  list: any = []
  // 新增地址
  onAdd() {
    if (this.type) {
      Storage.set(ADDRESSPAY, true)
    }
    this.$router.push({name: 'addaddress'})
  }
  selectAddress (item) {
    if (this.type) {
      console.log(item)
      Storage.set(SELECTADDRESS, item)
      this.$router.push({name: 'pay'})
    }
  }
  async getArealist () {
    this.show = true
    let {data, erron, message} = await getArealist({
      userId: Cookies.get(USERID)
    })
    this.show = false
    if (erron === 0) {
      this.list = data.map(item=>{
        return {
          ...item,
          id: item._id,
          address: item.province+item.city+item.county+ ' ' +item.addressDetail,
        }
      })
      let address = Storage.get(SELECTADDRESS)
      if (address) {
        this.chosenAddressId = address._id
      } else {
        this.list.forEach(item => {
          if (item.isDefault) {
            this.chosenAddressId = item._id
          }
        })
      }
    }
  }
  // '编辑地址
  onEdit(item, index) {
    Storage.set(ADDRESS, item)
    if (this.type) {
      Storage.set(ADDRESSPAY, true)
    }
    this.$router.push({name: 'editaddress'})
  }
  headerReturn () {
    if (this.type) {
      this.$router.push({name: 'pay'})
    } else {
      this.$router.push({name: 'my'})
    }
  }
}
</script>
<style lang="less" scoped>
.address-page{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /deep/ .van-address-list{
    flex: 1;
    overflow-y: scroll;
    background-color: #f6f6f6;
    padding-bottom: 10px;
    margin-bottom: 50px;
    .van-address-list__bottom{
      background-color: #f6f6f6;
      .van-button{
        background-color: #ffd84d;
        border: 1px solid #ffd84d;
        color: #222;
      }
    }
  }
  .noz{
    flex: 1;
    text-align: center;
    padding-top: 20px;
  }
  .loading-box{
    flex: 1;
  }
  .btn-box{
    margin: 15px;
    .van-button{
      background-color: #ffd84d;
      border: 1px solid #ffd84d;
      color: #222;
    }
  }
}
</style>