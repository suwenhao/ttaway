<template>
    <div class="cities-detail">
        <Header @return="headerReturn">选择收货地址</Header>
        <div class="search-address">
            <div class="left" @click="gotoList">
                <span>{{location.city}}</span>
                <van-icon size="7" class="iconfont" name="iconfont icontriangledownfill" />
            </div>
            <div class="right">
                <van-field
                    :disabled="location.city === '选择城市'"
                    left-icon="search"
                    clearable
                    v-model="address"
                    placeholder="请输入地址"
                    @input="getAddress"
                >
                </van-field>
            </div>
        </div>
        <div class="address-list" v-if="listShow">
            <ul v-if="list.length>0">
                <li @click="setAddress(item)" v-for="(item, i) in list" :key="i">
                    <div class="left">
                        <h2>{{item.title}}</h2>
                        <p>{{item.address}}</p>
                    </div>
                    <div class="right">
                        <van-icon size="18" color="green" class="iconfont" name="iconfont iconlocationfill" />
                    </div>
                </li>
                <li class="more">
                    <h2>找不到地址？</h2>
                    <h3>请尝试只输入小区、写字楼或学校名</h3>
                    <h3>详细地址（如门牌号）可稍后输入</h3>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <Nodata/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { namespace } from 'vuex-class';

import Nodata from '@/components/Nodata/index.vue'
import Header from '@/components/Layout/Header.vue'
// @ts-ignore
import { getSearchAddressList } from '@/service'
// @ts-ignore
import { Response, SearchCities } from '@/types/pages'
// @ts-ignore
import { ILocation } from '@/types/store/global'

const GlobalModule = namespace('global');
@Component({
    name: "CitiesDetail",
    components: {
        Header,
        Nodata
    }
})
export default class CitiesDetail extends Vue {
    // vuex global state
    @GlobalModule.State(state => state.location) location;
    // vuex global mutation
    @GlobalModule.Mutation('changeLocationLatLng') changeLocationLatLng;
    // state
    address: string = '';
    listShow: boolean = false;
    list: SearchCities[] = [];
    // 返回上一页
    headerReturn(){
        this.$router.push({name: 'home'})
    }
    // 跳转到城市列表
    gotoList () {
        this.$router.push({name: 'citiesList'})
    }
    // 获取地址
    async getAddress(val: string){
        if (val === '') {
            this.list = [];
            this.listShow = false;
            return;
        }
        this.listShow = true;
        if (this.location.city === '选择城市') {
            this.$notify('请先选择城市')
        } else {
            let params = {
                query: val,
                region: this.location.city
            };
            let {erron, data, message} = await getSearchAddressList<Response<SearchCities[]>>(params);
            // console.log(res);

            if (erron !== 0) {
                this.$notify(message);
                return;
            }
            this.list = data;
        }
    }
    setAddress (item: SearchCities) {
        console.log(item);
        let latitude = item.location.lat
        let longitude = item.location.lng
        let params: ILocation = {
            lat: latitude,
            lng: longitude,
            province: item.ad_info.province,
            id: item.id,
            district: item.ad_info.district,
            address: item.address,
            name: item.title
        };
        this.changeLocationLatLng(params);
        this.headerReturn()
    }
    mounted () {
        // this.getAddress('克洛维');
    }
}
</script>

<style scoped lang='less'>
.cities-detail{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .search-address{
        display: flex;
        background-color: #fff;
        padding: 10px 0;
        .left{
            width: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 15px;
            span{
                font-size: 12px;
                flex: 1;
                text-align: center;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .van-icon{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 12px;
            }
        }
        .right{
            flex: 1;
            .van-field{
                height: 40px;
                line-height: calc(40px / 2);
                background-color: #eee;
            }
            margin-right: 10px;
        }
    }
    .address-list{
        flex: 1;
        overflow-y: scroll;
        background-color: #fff;
        ul{
            li{
                border-bottom: 1px solid #eee;
                padding: 11px 15px;
                display: flex;
                justify-content: space-between;
                .left{
                    color: #222;
                    h2{
                        font-size: 15px;
                    }
                    p{
                        font-size: 12px;
                    }
                }
                .right{
                    display: flex;
                    align-items: center;
                }
            }
            .more{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #aaa;
                h2{
                    font-size: 15px;
                    font-weight: normal;
                    margin-bottom: 5px;
                }
                h3{
                    font-size: 13px;
                    font-weight: normal;
                }
            }
        }
    }
}
</style>