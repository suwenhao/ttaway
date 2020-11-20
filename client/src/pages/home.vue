<template>
    <div class="home-page" ref="home" @scroll="scroll" :class="notScroll?'notScroll':''">
        <home-header @goto="gotoAddressDetail">{{ location.name }}</home-header>
        <Search v-if="headerFixed" @goto="gotoAddressDetail"></Search>
        <div class="scroll-list-wrap" v-if="isAddress!==2">
            <SkHome v-if="!cateShow"></SkHome>
            <van-swipe v-if="cateShow" loop indicator-color="#ffd84d">
                <van-swipe-item v-for="(item, i) in catelist" :key="i">
                    <CateView :data="item"/>
                </van-swipe-item>
            </van-swipe>
            <div v-if="isAddress===3" class="shoplist-title" ref="shoptitle">推荐商家</div>
            <DropdownMenu
                v-if="isAddress===3"
                @clearFilter="clearFilter"
                @filter="filterChange"
                @change="menuChange"
                @scrollMenu="scrollMenu"
                @close="closeMenu"
                :fixed="menuFixed"></DropdownMenu>
            <div class="dropdiv" v-if="menuFixed"></div>
            <van-list
                v-if="isAddress===3"
                v-model="shopListShow"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class="shop-list">
                <ShopItem v-for="(item, i) in shoplist" :key="i" :data="item"></ShopItem>
            </van-list>
            <div class="dropdiv"></div>
            <Loading v-if="isAddress!==3"/>
        </div>
        <div class="blank" v-if="isAddress===2">
            <img :src="require('@/assets/images/home-blank.jpg')" alt="">
            <p>输入地址之后才能订餐哦</p>
            <van-button color="#ffd84d" type="primary" @click="gotoAddressDetail">手动选择地址</van-button>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import Star from "@/components/Star.vue";
import HomeHeader from "@/components/Layout/HomeHeader.vue";
import CateView from '@/components/Home/CateView.vue'
import DropdownMenu from '@/components/Home/DropdownMenu.vue'
import Search from '@/components/Home/Search.vue'
import ShopItem from '@/components/Home/ShopItem.vue'
import SkHome from "@/components/Skeleton/skhome.vue";
import Loading from "@/components/Loading/index.vue";
// @ts-ignore
import { getCategorieList, getShoppingList, getAddressDetail } from '@/service'
import { namespace } from 'vuex-class';
// @ts-ignore
import { shopFilter } from '@/utils/index'


const GlobalModule = namespace('global');
@Component({
    name: "Home",
    components: {
        HomeHeader,
        CateView,
        DropdownMenu,
        ShopItem,
        Search,
        Loading,
        SkHome,
        Star
    },
    computed: {
        isAddress () {
            if (this.location.name === '正在定位...') {
                return 1
            } else if(this.location.name === '未能获取地址') {
                return 2
            } else {
                return 3
            }
        },
        nigth () {
            var date = new Date()
            var currentHours = date.getHours()
            if (currentHours>=20) {
                return true
            } else {
                return false
            }
        }
    }
})
export default class Home extends Vue {
    notScroll: boolean = false // 筛选条件打开时禁止滚动
    headerFixed: boolean = false  // 头部固定
    menuFixed: boolean = false // 筛选固定
    offset: number = 1  // 当前页
    limit: number = 3  // 分页大小
    shoplist: any = []  // 餐馆列表
    total: number = 0   // 总数量
    totalPage: number = 1 // 总页数
    load: boolean = true  // 上拉加载
    finished: boolean = false  //上拉加载完毕 
    catelist: any = []  // 餐馆分类列表
    cateShow: boolean = false // 餐馆分类显示
    sort: number= 0
    filter: any = null
    @GlobalModule.State(state => state.location) location;
    @GlobalModule.Mutation('changeLocationLatLng') changeLocationLatLng;
    shopListShow: boolean = false
    @Watch('isAddress')
    onChangeValue(newVal: number, oldVal: number){
        if (newVal === 3) {
            this.getCategorieList()
            this.clearFilter()
        }
    }
    init () {
        let self = this;
        //@ts-ignore
        if (this.isAddress !== 3) {
            //@ts-ignore
            this.$qmap().then((QMap: any) => {
                this.getLocation(QMap)
            })
        } else {
            this.getCategorieList()
        }
    }
    clearFilter () {
        this.filter = null
        this.offset = 1
        this.finished = false
        this.shoplist = []
        this.getShoppingList()
        console.log(111)
    }
    menuChange (value) {
        // console.log(value)
        if (value === 4) {
            this.shoplist.sort((a,b) => {
                // @ts-ignore
                let aa = this.nigth?a[shopFilter(value)][1]:a[shopFilter(value)][0]
                // @ts-ignore
                let bb = this.nigth?b[shopFilter(value)][1]:b[shopFilter(value)][0]
                return aa - bb
            })
        } else if (value === 3 || value === 5) {
            this.shoplist.sort((a, b) => {
                return a[shopFilter(value)] - b[shopFilter(value)]
            })
        } else if (value === 1 || value === 2) {
            this.shoplist.sort((a,b) => {
                return b[shopFilter(value)] -a[shopFilter(value)]
            })
        }
    }
    filterChange (active) {
        this.filter = active
        this.shoplist = []
        this.offset = 1
        this.finished = false
        this.getShoppingList(() => {
            this.offset++
        })
    }
    async getShoppingList (cb?: any) {
        try {
            this.shopListShow = true
            let { offset, limit, location, sort, filter } = this
            let params: any = {
                offset,
                limit,
                startgeohash: location.lat+','+location.lng
            }
            if (filter) {
                params.promotion = filter
            }
            let { data } = await getShoppingList(params)
            this.shoplist.push(...data.data)
            this.total = data.total
            this.totalPage = this.total<this.limit?1:Math.ceil(this.total/this.limit)
            this.shopListShow = false
            this.offset++
            cb&&cb()
        } catch (ex) {
            console.log(ex)
        }
    }
    async getCategorieList(){
        this.cateShow = false
        let res = await getCategorieList({parent_id: 0})
        // @ts-ignore
        let res1 = await getCategorieList({parent_id: res.data[0].id})
        // @ts-ignore
        let newArr = [].concat(res.data, res1.data)
        let result = [];
        
        // js 把一个数组分割成 n 个一组
        for( var i = 0, len = newArr.length; i < len; i += 10 ) {
            result.push( newArr.slice( i, i + 10 ) );
        }
        // console.log(result)
        setTimeout(()=>{
            this.cateShow = true
        },500)
        this.catelist = result
    }
    getLocation(QMap){
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        if (navigator.geolocation){ //用浏览器获取坐标地址
            navigator.geolocation.getCurrentPosition(({coords}: any)=>{
                let jian = 0.002463
                let jia = 0.005591
                let latitude  = coords.latitude-jian
                let longitude = coords.longitude+jia
                // console.log(QMap, latitude, longitude)
                this.addressDetail(QMap, {latitude, longitude})
            }, this.showError, options);
        }else{
            this.$toast("浏览器不支持地理定位。");
            this.$router.push('/cities/detail')
        }
    }
    showError(err) {
        let params = {
            name: '未能获取地址'
        };
        this.changeLocationLatLng(params);
        // this.$toast('定位失败');
        setTimeout(() => {
            this.$router.push('/cities/detail');
            let params = {
                name: '正在定位...'
            };
            this.changeLocationLatLng(params);
        }, 2000)
    }
    async addressDetail(QMap, coords){ //获取地理位置
        let myLatlng = new QMap.maps.LatLng(coords.latitude, coords.longitude);
        let {erron, data} = await getAddressDetail({
            geohash: `${myLatlng.lat},${myLatlng.lng}`
        })
        if (erron === 0) {
            this.changeLocationLatLng({
                lat: data.location.lat,
                lng: data.location.lng,
                city: data.ad_info.city.replace('市',''),
                district: data.ad_info.district,
                province: data.ad_info.province,
                name: data.address_component.street_number,
                address: data.address
            });
        }
    }
    gotoAddressDetail () {
        this.$router.push('/cities/detail')
    }
    scrollMenu () {
        this.notScroll = true
    }
    closeMenu () {
        this.notScroll = false
    }
    scroll($event) {
        if ($event.target.scrollTop>35){
            this.headerFixed = true
        } else {
            this.headerFixed = false
        }
        // @ts-ignore
        let menuTop = this.$refs.shoptitle.offsetTop + this.$refs.shoptitle.clientHeight - 55
        if($event.target.scrollTop>=menuTop) {
            this.menuFixed = true
        } else {
            this.menuFixed = false
        }
    }
    onLoad () {
        if (this.offset<=this.totalPage) {
            setTimeout(() => {
                this.getShoppingList()
            }, 1000)
        } else {
            this.finished = true
            this.shopListShow = false
        }
    }
    mounted () {
        this.init()
    }
}
</script>

<style scoped lang='less'>
    .home-page{
        height: 100%;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        &.notScroll{
            overflow: hidden;
        }
        .scroll-list-wrap{
            background-color: #fff;
        }
        .blank{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                width: 240px;
            }
            p{
                font-size: 18px;
                margin: 5px 0;
            }
            .van-button{
                color: #222 !important;
            }
        }
        .dropdiv{
            height: 50px;
        }
        .shoplist-title{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            font-size: 14px;
            color: #000;
            &::after, &:before {
                display: block;
                content: "";
                width: 40px;
                height: 1px;
                background-color: #999;
            }
            &:before {
                margin-right: 15px;
            }
             &::after{
                 margin-left: 15px;
             }
        }
    }

</style>