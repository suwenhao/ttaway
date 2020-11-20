<template>
  <div class="login-page">
    <div class="logo">
      <img :src="require('@/assets/images/logo.png')" alt="">
      <p>团团外卖</p>
    </div>
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phone"
          name="phone"
          label="手机号码"
          placeholder="手机号码"
          :rules="[
            { required: true, message: '请填写手机号码' },
            { validator, message: '手机号码格式出错' },
          ]"
        />
        <van-field
          v-model="sms"
          center
          clearable
          name="sms"
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请填写短信验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary" @click.stop="send" native-type="button">发送验证码</van-button>
          </template>/a
        </van-field>
        <div class="btn" style="margin: 16px;">
          <van-button color="#ffd84d" type="info" round block native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts">
import Cookies from 'js-cookie'
import { Component, Vue } from 'vue-property-decorator'
// @ts-ignore
import {TOKEN, USERID} from '@/utils/storage'
// @ts-ignore
import { getSms, login } from '@/service'
@Component({
  computed: {
    token () {
      return Cookies.get(TOKEN) || null
    }
  },
  mounted () {
    if (this.token) {
      this.$router.push({name: 'home'})
    }
  }
})
export default class Login extends Vue  {
  phone: string = ''
  sms: string = ''
  async onSubmit (values) {
    console.log('submit', values);
    let {erron, data, message} = await login(values)
    if (erron !== 0) {
      this.$notify({ type: 'warning', message})
    } else {
      Cookies.set(USERID, data._id)
      Cookies.set(TOKEN, true)
      if (this.$route.query.path) {
        // @ts-ignore
        this.$router.push(this.$route.query.path)
      } else {
        this.$router.push({name: 'my'})
      }
      this.$toast('登录成功')
    }
  }
  validator (val) {
    return /^1[3456789]\d{9}$/.test(val)
  }
  async send () {
    if (this.phone === '') {
      this.$notify({ type: 'warning', message: '请输入手机号码' })
    } else if(!this.validator(this.phone)) {
      this.$notify({ type: 'warning', message: '手机号码格式出错' })
    } else {
      let {erron, data} = await getSms({
        phone: this.phone
      })
      if (erron === 0) {
        this.$notify({type: 'success', message: '发送验证码成功'})
      }
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>
.login-page{
  .logo{
    padding: 40px 0;
    margin: 0 auto;
    width: 80px;
    height: 80px;
    img{
      width: 80px;
      height: 80px;
    }
  }
  .btn{
    .van-button{
      color: #222 !important;
    }
  }
}
</style>