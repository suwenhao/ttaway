<template>
  <Scroll :style="{height: height}" ref="scroll" :data="[]" class="food-shop">
    <div class="content">
      <div class="delivery">
        <h3>配送信息</h3>
        <p>由蜂鸟快送提供配送，约{{data&&data.distance.order_lead_time}}分钟送达，距离{{data&&data.distanceValue | formatDistance}}km</p>
        <p>配送费￥{{data&&data.starting_price}}</p>
      </div>
      <div class="delivery">
        <h3>商家信息</h3>
        <p>{{data&&data.introduction}}</p>
        <van-cell-group>
          <van-cell title="品类" :value="data&&data.category_data.map(item=>item.name).join('/')" />
          <van-cell title="商家电话">
            <template slot="default">
              <a style="color: #00a6ff;" :href="`tel:${data&&data.phone}`">
                <van-icon name="phone-o" />
                联系商家
              </a>
            </template>
          </van-cell>
          <van-cell title="营业时间" :value="data&&(data.startTime + '-' + data.endTime)" />
          <van-cell title="所在城市" :value="data&&data.city" />
          <van-cell title="地址" :label="data&&data.address.text" />
        </van-cell-group>
      </div>
      <div class="delivery">
        <h3>营业资质</h3>
        <div class="van-image-box">
          <van-image
            v-if="data&&data.business_license_image"
            width="4rem"
            height="4rem"
            fit="cover"
            @click="showImage(0)"
            :src="IMAGE_URL + (data&&data.business_license_image)"
          />
          <van-image
            v-if="data&&data.catering_service_license_image"
            width="4rem"
            height="4rem"
            fit="cover"
            @click="showImage(1)"
            :src="IMAGE_URL + (data&&data.catering_service_license_image)"
          />
        </div>
      </div>
    </div>
    <van-image-preview v-model="show" :startPosition="startPosition" :images="images"></van-image-preview>
  </Scroll>
</template>
<script lang="ts">
// @ts-ignore
import { IMAGE_URL } from '@/config'
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Scroll from '@/components/Scroll.vue'

@Component({
  mounted () {
    if (this.data&&this.data.business_license_image) {
      this.images.push(IMAGE_URL + this.data.business_license_image)
    }
    if (this.data&&this.data.catering_service_license_image) {
      this.images.push(IMAGE_URL + this.data.catering_service_license_image)
    }
  },
  components: {
    Scroll
  },
  filters: {
    formatDistance (value){
      return Math.round((value/1000)*100)/100
    }
  }
})
export default class FoodShop extends Vue {
  IMAGE_URL: string = IMAGE_URL
  show: boolean = false
  startPosition: number = 0
  images = []
  @Prop({
    type: Object,
    default: {}
  }) data!: any;
  @Prop(String) height!: string;
  @Watch('data')
  dataChange(){
    // @ts-ignore
    this.$refs.scroll.refresh()
  }
  showImage (i) {
    this.show = true
    this.startPosition = i
  }
}
</script>
<style lang="less" scoped>
.food-shop{
  overflow: hidden;
  .delivery{
    padding: 15px;
    border-bottom: 10px solid #eee;
    .van-image-box{
      .van-image{
        margin-right: 10px;
      }
    }
    h3{
      font-size: 14px;
      padding-bottom: 10px;
    }
    p{
      font-size: 12px;
      color: #666;
    }
    p:nth-child(3){
      margin-top: 5px;
    }
    .van-cell-group{
      margin-top: 10px;
    }
    .van-cell{
      padding: 10px 0px;
    }
  }
}
</style>