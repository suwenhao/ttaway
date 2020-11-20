<template>
    <div class="header-search-box">
        <div class="header-search">
            <van-icon size="18" name="search" />
            <span>搜索商品、商家名称</span>
        </div>
    </div>
</template>

<script lang='ts'>
    import { Component, Vue, Prop, Emit } from "vue-property-decorator";

    @Component({
        name: "HomeHeader"
    })
    export default class HomeHeader extends Vue {
        @Prop({
            type: Boolean,
            default: false
        })
        readonly fixed!:boolean;
        @Emit('goto')
        handleClick (e) {

        }
    }
</script>

<style scoped lang='less'>
  .header-search-box {
      background-color: @thcol;
      padding: 10px 0;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 10;
      .header-search{
          padding: 8px;
          margin: 0 20px;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #888;
          span{
              margin-left: 5px;
              font-size: 14px;
          }
      }
      
  }
</style>