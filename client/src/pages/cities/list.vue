<template>
    <div class="city-list-wrap">
        <Header class="header-warp" @return="headerReturn">选择城市</Header>
        <div class="search">
            <van-field @input="changeGetCityList" input-align="center" v-model="value" placeholder="输入城市名" />
        </div>
        <div class="content">
            <Loading v-if="loadingShow"/>
            <div class="index" v-if="!loadingShow && indexShow">
                <van-index-bar :sticky="true">
                    <div v-for="(item,i) in indexList" :key="i" >
                        <div>
                            <van-index-anchor :index="item"/>
                        </div>
                        <van-cell  @click.native="setAddress(jtem)" v-for="(jtem, j) in list[item]" :key="j" :title="jtem.name"/>
                    </div>
                </van-index-bar>
            </div>
            <div class="list-warp" v-if="!indexShow">
                <ul v-if="lilist.length>0">
                    <li @click="setAddress(item)" v-for="(item, i) in lilist" :key="i">
                       {{item.name}}
                    </li>
                </ul>
                <ul v-else>
                    <li style="padding: 50px; text-align: center;">无结果</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
// ts class
import { Component, Vue } from "vue-property-decorator";
import {namespace} from 'vuex-class';
// component
import Header from '@/components/Layout/Header.vue'
import Loading from "@/components/Loading/index.vue";
// service and types
// @ts-ignore
import { getCityList } from '@/service'
// @ts-ignore
import { Response, CitiesData } from '@/types/pages'
// storage
// @ts-ignore
import StorageModel, {CITYLIST} from '@/utils/storage'

// 获取vuex state
const GlobalModule = namespace('global');
const Storage = new StorageModel();

@Component({
    name: "CitiesList",
    components: {
        Header,
        Loading,
    }
})
export default class CitiesList extends Vue {
    // state
    value = "";
    loadingShow: boolean = false;
    indexList: string[] = [];
    indexShow: boolean = true;
    lilist: CitiesData[] = [];
    list: {
        [key: string]: CitiesData[]
    } = {};
    // vuex global mutation
    @GlobalModule.Mutation('changeLocationLatLng') changeLocationLatLng;
    // 返回上一页
    headerReturn(){
        this.$router.push({name: 'citiesDetial'})
    }
    // 获取城市列表
    async getCityList () {
        this.loadingShow = true;
        if (Storage.get(CITYLIST)) {
            this.list = Storage.get(CITYLIST);
            this.indexList = Object.keys(Storage.get(CITYLIST));
        } else {
            let { erron, data, message } = await getCityList<Response<CitiesData[]>>();
            if (erron !== 0) {
                this.$notify(message);
                this.loadingShow = false;
                return;
            }
            let city = {};
            data.forEach((item: CitiesData) => {
                let tag = item.abbr.substring(0,1);
                if (city[tag]) {
                    city[tag].push(item);
                } else {
                    city[tag] = [];
                    city[tag].push(item);
                }
            });
            // console.log(city);
            this.list = city;
            this.indexList = Object.keys(city);
            Storage.set(CITYLIST, city);
        }
        this.loadingShow = false
    }
    // 初始化
    async init () {
        this.getCityList()
    }
    // 点击城市设置当前城市
    setAddress (jtem: CitiesData) {
        console.log(jtem);
        let params = {
            city: jtem.name,
            lat: 0,
            lng: 0,
            province: '',
            area: '',
            address: '正在定位...'
        };
        this.changeLocationLatLng(params);
        // 跳转回当前城市搜索地址
        this.headerReturn()
    }
    // 搜索获取城市列表
    async changeGetCityList (val: string) {
        if (val === '') {
            this.indexShow = true;
            this.lilist = [];
            return;
        }
        let { erron, data, message } = await getCityList<Response<CitiesData[]>>({name: val});
        if (erron !== 0) {
            this.$notify(message);
            return;
        }
        this.lilist = data;
        this.indexShow = false;
    }
    mounted () {
        this.init()
    }
}
</script>

<style scoped lang='less'>
    .city-list-wrap{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .search{
            width: 100vw;
            background-color: @thcol;
            height: 50px;
            .van-field{
                width: 90%;
                height: 40px;
                border-radius: 40px;
                line-height: calc(40px / 2);
                margin: 0 auto;
            }
        }
        .content{
            flex: 1;
            overflow-y: scroll;
            .index{
                /deep/ .van-index-anchor--sticky{
                    position: fixed !important;
                }
                /deep/ .van-index-bar__sidebar{
                    .van-index-bar__index{
                        line-height: 18px !important;
                        font-size: 13px;
                    }
                }
            }
        }
        .list-warp{
            background-color: #fff;
            ul{
                li{
                    font-size: 14px;
                    padding: 10px 10px 10px 20px;
                    border-bottom:1px solid #eee;
                }
            }
        }
    }
</style>