<template>
  <div class="hongbao-page">
    <Header class="header-warp" @return="headerReturn">我的红包</Header>
    <div class="page-content">

    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
// @ts-ignore
import myMixin from '@/pages/mixins/my'
@Component({
  mixins: [myMixin]
})
export default class Hongbao extends Vue {

}
</script>
<style lang="less" scoped>
.hongbao-page{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .page-content{
    flex: 1;
  }
}
</style>