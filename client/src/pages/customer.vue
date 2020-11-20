<template>
  <div class="customer-page">
    <Header class="header-warp" @return="headerReturn">客服咨询</Header>
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
export default class Customer extends Vue {

}
</script>
<style lang="less" scoped>
.customer-page{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .page-content{
    flex: 1;
  }
}
</style>