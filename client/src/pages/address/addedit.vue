<template>
  <div class="addedit-page">
    <Header class="header-warp" @return="headerReturn">{{type==='add'?'添加地址':'编辑地址'}}</Header>
    <Loading v-if="show"/>
    <van-address-edit
      v-else
      :area-list="areaList"
      show-postal
      :show-delete="type==='add'?false:true"
      show-set-default
      :save-button-text="type==='add'?'添加':'保存'"
      :address-info="addressInfo"
      :detail-rows="2"
      :detail-maxlength="30"
      :is-saving="loading"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script lang="ts">
import Cookies from 'js-cookie'
// @ts-ignore
import { getAreaData, addMyAddress, editMyAddress, deleteMyAddress } from '@/service'
// @ts-ignore
import StorageModel, {ADDRESS, ADDRESSPAY, TOKEN, USERID} from '@/utils/storage'
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
    this.type = this.$route.meta.state
    let addressObj = Storage.get(ADDRESS) || {}
    let newObj = Object.assign({}, addressObj)
    delete newObj._id
    delete newObj.userId
    this.getAreaData(() => {
      if (this.type === 'edit') {
        this.addressInfoId = {
          _id: addressObj._id,
          userId: addressObj.userId,
        }
        this.addressInfo = newObj
      }
    })
    
  }
})
export default class AddEdit extends Vue {
  type: string = ''
  addressInfo: any = {}
  addressInfoId: any = {}
  loading: boolean = false
  show: boolean = false
  areaList: any = []
  async getAreaData (cb) {
    this.show = true
    let res: any = await getAreaData({})
    if (res.erron === 0) {
      let province_list = {}
      let city_list = {}
      let county_list = {}
      res.data.forEach(item => {
        if (item.parentId === '1') {
          province_list[item.value] = item.name
        }
      })
      res.data.forEach(item => {
        Object.keys(province_list).forEach(jtem => {
          if (item.parentId === jtem) {
            city_list[item.value] = item.name
          }
        })
      })
      res.data.forEach(item => {
        Object.keys(city_list).forEach(jtem => {
          if (item.parentId === jtem) {
            county_list[item.value] = item.name
          }
        })
      })
      this.areaList = {province_list, city_list, county_list}
      this.$nextTick(() => {
        this.show = false
        cb&&cb()
      })
    }
  }
  async onSave(content) {
    console.log(content);
    this.loading=true
    if (this.type === 'add') {
      content.userId = Cookies.get(USERID)
      let res: any = await addMyAddress(content)
      if (res.erron === 0) {
        this.$toast('添加地址成功')
        setTimeout(() => {
          if (Storage.get(ADDRESSPAY)) {
            this.$router.push('/addrlist/pay')
          } else {
            this.$router.push({name: 'addrlist'})
          }
        }, 1000)
      }
      this.loading=false
    } else {
      let data = {
        ...content,
        _id: this.addressInfoId._id,
        userId: this.addressInfoId.userId
      }
      let res: any = await editMyAddress(data);
      if (res.erron === 0) {
        this.$toast('修改地址成功')
        setTimeout(() => {
          if (Storage.get(ADDRESSPAY)) {
            this.$router.push('/addrlist/pay')
          } else {
            this.$router.push({name: 'addrlist'})
          }
        }, 1000)
      }
      this.loading=false
    }
  }
  async onDelete() {
    let res: any = await deleteMyAddress({
      _id: this.addressInfoId._id
    })
    if (res.erron === 0) {
      this.$toast('删除地址成功')
      setTimeout(() => {
        this.$router.push({name: 'addrlist'})
      }, 1000)
    }
    console.log('delete');
  }
  headerReturn () {
    if (Storage.get(ADDRESSPAY)) {
      this.$router.push('/addrlist/pay')
    } else {
      this.$router.push({name: 'addrlist'})
    }
  }
}
</script>
<style lang="less" scoped>
.addedit-page{
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-address-edit{
    background-color: #f6f6f6;
    flex: 1;
    .van-button--danger{
      background-color: #ffd84d;
      border: 1px solid #ffd84d;
      color: #222;
    }
  }
}
</style>