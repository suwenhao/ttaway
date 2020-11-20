<template>
    <div class="header-wrap">
        <div class="left" @click="handleClickLeft">
            <van-icon size="20" class="iconfont" name="iconfont iconback_light" />
        </div>
        <div class="text-content ellipsis">
            <slot />
        </div>
        <div class="right" @click="handleClickRight">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
    name: "CommonHeader"
})
export default class Header extends Vue {
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
    @Emit('return')
    handleClickLeft (e) {}

    @Emit('rightClick')
    handleClickRight(e) {}
}
</script>

<style scoped lang='less'>
.header-wrap {
    display: flex;
    justify-content: space-between;
    background-color: @thcol;
    color: @primary-color;
    height: 50px;
    align-items: center;
    .left, .right{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        text-align: center;
    }
}
</style>