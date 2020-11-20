<template>
    <div class="header-wrap">
        <div class="header-position">
            <van-icon size="18" class="iconfont" name="iconfont iconlocationfill" />
            <span @click="handleClick">
                <slot></slot>
            </span>
            <van-icon size="7" class="iconfont" name="iconfont icontriangledownfill" />
        </div>
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
            default: true
        })
        readonly left!: boolean;
        @Prop({
            type: Boolean,
            default: true
        })
        readonly right!: boolean;
        @Emit('goto')
        handleClick (e) {

        }
    }
</script>

<style scoped lang='less'>
    .header-wrap {
        background-color: @thcol;
        padding: 10px 0;
        .header-position{
            display: flex;
            align-items: center;
            margin: 10px 20px;
            color: @primary-color;
            span{
                max-width: 100px;
                font-size: 16px;
                font-weight: 900;
                margin: 0 5px;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
        }
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