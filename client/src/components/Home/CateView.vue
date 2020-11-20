<template>
  <div class="cate-view">
    <ul>
      <li :key="i" v-for="(item, i) in data">
        <div>
          <img v-lazy="item.image_url"/>
          <span>{{item.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "CateView",
})
export default class CateView extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  readonly data!: any;
}
</script>
<style lang="less" scoped>
  .cate-view{
    ul{
      display: flex;
      min-height: 180px;
      max-height: 180px;
      flex-wrap: wrap;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      li{
        flex: 0 0 20%;
        margin-top: 15px;
        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
          }
          span{
            margin-top: 5px;
            height: 15px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>