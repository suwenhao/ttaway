<template>
  <div class="info-page">
    <Header class="header-warp" @return="headerReturn">个人资料</Header>
    <div class="page-content">
      <Loading v-if="loading"/>
      <van-cell-group v-show="!loading">
        <van-cell class="avatar-box" title="头像" is-link @click="changeFile">
          <template #default>
            <img @click.stop="show=true" class="avatar" v-lazy="IMAGE_URL + (data&&data.avatar_image)" alt="">
            <input name="file" accept="image/*" @change="uploadImg($event)" ref="file" class="file" type="file" >
          </template>
        </van-cell>
        <van-cell title="昵称" :value="data&&data.realName||'无'" is-link/>
        <van-cell title="用户名" :value="data&&data.username||'无'" is-link/>
        <van-cell title="邮箱" :value="data&&data.email||'无'" is-link/>
        <van-cell title="手机号码" :value="data&&data.phone||'无'" is-link/>
      </van-cell-group>
    </div>
    <van-image-preview v-model="show" :images="images"></van-image-preview>
  </div>
</template>
<script lang="ts">
import Cookies from 'js-cookie'
// @ts-ignore
import { getUserInfo, uploadAvatar} from '@/service'
import {Component, Vue} from 'vue-property-decorator'
// @ts-ignore
import {TOKEN, USERID} from '@/utils/storage'
// @ts-ignore
import myMixin from '@/pages/mixins/my'
// @ts-ignore
import { IMAGE_URL } from '@/config'
import Clipic from 'clipic'

const clipic = new Clipic()

@Component({
  mixins: [myMixin],
  computed: {
    token () {
      return Cookies.get(TOKEN) || null
    }
  },
  created () {
    if (this.token) {
      this.getUserInfo()
    } else {
      this.$router.push({name: 'login'})
    }
  }
})
export default class Info extends Vue {
  IMAGE_URL: string = IMAGE_URL
  data: any = null
  base64 = ''
  show: boolean = false
  images: any = []
  loading: boolean = false
  async getUserInfo () {
    this.loading = true
    let {erron, data, message} = await getUserInfo({_id: Cookies.get(USERID)})
    this.loading = false
    if (erron === 0) {
      this.data = data
      let img = data.avatar_image ? IMAGE_URL + data.avatar_image:require('@/assets/images/error.jpg')
      // console.log(img)
      this.images = [img]
    } else {
      this.$notify({type: 'warning', message})
    }
  }
  changeFile () {
    // @ts-ignore
    this.$refs.file.click();
  }
  uploadImg (ev) {
    let that = this
    console.log(ev.target.files)
    const files = ev.target.files
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = (img: any) => {
      clipic.getImage({
        width: 400,
        height: 400,
        src: img.target.result,
        onDone: async (base64: any) => {
          let res: any = await uploadAvatar({
            _id: Cookies.get(USERID),
            base64,
            avatar_image: that.data.avatar_image
          })
          if (res.erron === 0) {
            that.$toast('上传成功')
            that.getUserInfo()
          }
          console.log(res)
        }
      })
    }
    ev.target.value = ''
  }
}
</script>
<style lang="less" scoped>
.info-page{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .page-content{
    flex: 1;
    .avatar-box{
      align-items: center;
      padding: 8px 15px;
      /deep/ .van-cell__value{
        display: flex;
        justify-content: flex-end;
      }
    }
    .file{
      opacity: 0;
      width: 0;
      height: 0;
    }
    .avatar{
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
  }
}
</style>