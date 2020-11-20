<template>
  <div class="problem-page">
    <Header class="header-warp" @return="headerReturn">常见问题</Header>
    <div class="page-content">
        <van-collapse v-model="activeNames">
          <van-collapse-item :icon="item.icon" v-for="(item, i) in list" :key="i" :title="item.title" :name="item.name">
            <div class="help-item" v-for="(jtem, j) in item.problems" :key="j">
              <div class="help-title">Q: {{jtem.title}}</div>
              <div class="help-content" v-html="jtem.content"></div>
            </div>
          </van-collapse-item>
        </van-collapse>
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
export default class Problem extends Vue {
  activeNames: string[] = []
  list: any = [
    {
      name: '1',
      title: '支付问题',
      icon: 'gold-coin-o',
      problems: [
        {
          title: '为什么提示我“账户存在异常，无法下单”？',
          content: '包含（但不仅限于）以下行为者，系统将自动予以封禁（客服无权解封）：<br/> i）有过虚假交易（编造不存在真实买卖的订单）；<br/> ii）有过恶意下单行为；'
        },
        {
          title: '在线支付取消订单后钱怎么返还？',
          content: '订单取消后，款项会在一个工作日内，直接返还到您的团团账户余额。'
        },
        {
          title: '怎么查看退款是否成功？',
          content: '退款会在一个工作日之内到团团账户余额，可在“账号管理——我的账号”中查看是否到账。'
        },
        {
          title: '在线支付的过程中，订单显示未支付成功，款项却被扣了，怎么办？',
          content: '这个情况属于第三方交易平台付款延迟问题，我们会立即将扣款退回到您的团团账户余额。'
        },
        {
          title: '团团账户里的余额怎么提现？',
          content: '余额可到团团网（tuantuan.com）——“个人中心→团团余额”里提取到您的银行卡或者支付宝账号，另外，余额也可直接用于支付外卖订单（限支持在线支付的商家）。'
        }
      ]
    },
    {
      name: '2',
      title: '订单问题',
      icon: 'orders-o',
      problems: [
        {
          title: '如何取消订单?',
          content: '如果商家尚未接单，您可以在订单详情页通过“取消订单”功能进行取消;如果商家已接单，则需要您电话联系后由商家取消订单。'
        },
        {
          title: '我的订单为什么被取消了？',
          content: '如果商家5分钟（部分品牌商家8分钟）未接您的订单，为了保障您的权益，系统将会为您自动取消订单；商家接单后可能由于无法联系到您、菜品售完等原因无法配送，因而取消了您的订单，具体原因可查看系统发送的短信或通知。'
        },
        {
          title: '如何进行催单？',
          content: '您可以在订单状态页面点击“电话催单”按钮向商家催单。'
        },
        {
          title: '刚下单发现信息填错了怎么办？',
          content: '如果商家尚未接单，您可以自主取消订单；如果商家已经接单，您可以电话联系商家后由对方取消订单。然后重新下一单。'
        },
        {
          title: '我的订单是否被商家确认？',
          content: 'App用户可以在商家确认您的订单时收到推送通知，并且订单状态会实时更新；手机触屏版及微信用户可以刷新订单状态页查看。'
        },
        {
          title: '预计送达时间为什么与我实际收货的时间不符？',
          content: '预计送达时间是系统根据用户评价的时间进行综合计算而得到的参考时间，商家的实际配送时间会受到当天的天气、订单量等外界因素影响。'
        },
        {
          title: '为什么会出现无法下单情况？',
          content: '无法下单有很多情况，可能是菜品售完、商家不在营业时间等，请查看无法下单时给的提示。'
        },
        {
          title: '为什么提示下单次数过多，已无法下单？',
          content: '同一手机号在同一设备上一天最多可以成功提交7次订单（在线支付以完成支付为准，货到付款以提交订单为准）。'
        }
      ]
    },
    {
      name: '3',
      title: '优惠问题',
      icon: 'question-o',
      problems: [
        {
          title: '哪些商家有优惠？都有些什么优惠？',
          content: '有优惠的商家在商家列表页均含有优惠标识；具体的优惠可以查看活动详情或者商家详情页中的描述'
        },
        {
          title: '在新用户享受的优惠中，新用户的条件是什么？',
          content: '新用户是指第一次在团团外卖下单的用户（同一设备、同一手机号、同一账户、同一支付账号仅可享受一次）。'
        },
        {
          title: '我达到了满赠、满减的优惠的金额，为什么没有享受相关的优惠？',
          content: '满赠与满减优惠是以订单内菜品的总额及餐盒费来计算的，不包含配送费。'
        },
        {
          title: '超时赔付是什么意思？',
          content: '超时赔付模式即：商家承诺一个送达时间和一个折扣,从用户下单时间开始计算,如果外卖超过了承诺时间才送到,该份外卖按照折扣价收取费用。由于恶劣天气、某些美食烹调时间过长、或者其他因素,商家会选择性的延长承诺时间或者不做承诺。预订单不参与超时赔付'
        },
      ]
    },
    {
      name: '4',
      title: '其他问题',
      icon: 'ellipsis',
      problems: [
        {
          title: '如果对商家服务不满意如何进行投诉？',
          content: '您可以在该订单完成评价后点击订单详情页中的意见反馈向客服投诉，或者拨打团团外卖的客服电话（10109777）向客服进行投诉。'
        },
        {
          title: '如何联系客服解决问题？',
          content: '您可以拨打团团外卖的客服电话（10109777）或者在“我的”——>“意见反馈”页面提交反馈'
        },
        {
          title: '我用的是手机客户端，为什么无法定位？',
          content: '请先检查手机的网络以及是否开启定位功能。若确认正常，请试着在户外或wifi环境下进行定位。'
        },
        {
          title: '如何修改自己的账户信息？',
          content: '团团外卖使用的是团团账号，您可以在“我的”页面修改个人账号信息，也可以在团团网账号页面修改个人账号'
        },
        {
          title: '为什么有时需要输入短信验证码？',
          content: '为了保障您的账号安全及商家利益，对于新用户及一些有异常行为的下单系统会提示您输入短信验证码。如果迟迟未接收到短信验证码，您同样可以选择接听语音验证码。'
        },
        {
          title: '什么是外卖价、划线价、门店价、门市价、折扣价？',
          content: '1、外卖价：外卖价为外卖商品/服务的销售价，是您最终决定是否购买外卖商品/服务的依据。<br/>2、划线价/门店价/门市价：商品/服务展示的划横线的价格/门店价/门市价为参考价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品/服务在团团平台上曾经展示过的销售价或商品/服务的实体门店指导价、实体门店展示销售价等；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价、实体门店指导价、实体门店展示销售价等可能会与您购物/消费时展示的不一致，该价格仅供您参考。<br/>3、折扣：如无特殊说明，折扣指商户在原价、或划线价/门店价/门市价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价、实体门店指导价、实体门店展示销售价等）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系商户/团团客服进行咨询。'
        },
        {
          title: '为什么进入团团外卖APP后，未看到“集16强，得66元现金”活动？',
          content: '“集16强，得66元现金”活动时间为6月30日00时00分—7月15日21时59分。领取奖励时间为7月15日22时00分—7月16日22时00分。故在上述时间范围外，进入APP内，无活动相关信息。'
        },
      ]
    }
  ]
}
</script>
<style lang="less" scoped>
.problem-page{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .page-content{
    flex: 1;
    overflow-y: scroll;
    /deep/ .van-collapse-item__content{
      background-color: #eee;
    }
    .help-item {
      padding: 15px 39px 14px 0;
      border-bottom: 1px solid #dddddd;
      .help-title{
        font-size: 15px;
        font-weight: normal;
        color: #333333;
      }
      .help-content{
        font-size: 12px;
        color: #888888;
        margin-top: 13px;
      }
    }
  }
}
</style>