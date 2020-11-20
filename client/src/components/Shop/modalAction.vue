<template>
  <van-action-sheet v-model="actionShow" :title="data&&data.name">
      <div class="content">
        <div class="content-title">
          优惠
        </div>
        <div class="content-main">
          <div class="content-action" :key="i" v-for="(item, i) in data&&data.activitie_data">
            <span class="title" :style="{'background-color': `#${item.icon_color}`}">
              {{item.title}}
            </span>
            <span class="detail">{{item.detail}}</span>
          </div>
        </div>
      </div>
    </van-action-sheet>
</template>
<script lang="ts">
import {Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({})
export default class ModalAction extends Vue {
  @Prop(Object) data!: any;
  actionShow: boolean = true;
  @Watch('actionShow')
  actionShowChange(val){
    if (val===false) {
      this.$emit('closeModal')
    }
  }

}
</script>
<style lang="less" scoped>
.content{
  &-title{
    padding: 0 10px 10px;
  }
  &-main{
    padding: 0 20px;
    min-height: 100px;
  }
  &-action{
    display: flex;
    justify-content: flex-start;
    line-height: 18px;
    padding-bottom: 10px;
    .title{
      color: #fff;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-radius: 2px;
      font-size: 13px;
      display: block;
    }
    .detail{
      font-size: 13px;
      color: #888;
      margin-left: 10px;
    }
  }
}
</style>