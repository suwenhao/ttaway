<template>
    <ul class="star-wrap">
        <template v-for="(item, index) of starNum">
            <li v-if="item !== 'half'"
                :key="index"
                class="iconfont"
                :class="item === 'active' ? 'active' : ''">
                &#xe70b;
            </li>
            <li v-else
                :key="index"
                class="active iconfont">
                &#xe6f0;
            </li>
        </template>
        <li>{{ nums }}</li>
    </ul>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";

type Type = "none" | "active" | "half";

@Component
export default class Star extends Vue {
    @Prop({
        type: Number,
        default: 3.5
    })
    readonly nums!: number;

    get starNum() {
        const result: Type[] = [];
        for (let i = 0; i < 5; i++) {
            result.push("none");
        }
        if (!this.nums) return result;
        if (this.nums % 1 < 1) {
            let index = Math.floor(this.nums);
            result.splice(0, index + 1);
            result.unshift("half");
            for (let i = 0; i < index; i++) {
                result.unshift("active");
            }
        } else {
            result.splice(0, this.nums);
            for (let i = 0; i < this.nums; i++) {
                result.push("active");
            }
        }
        return result;
    }
}
</script>

<style scoped lang='less'>
.star-wrap {
    display: inline-block;
    font-size: 12px;
    li {
        display: inline-block;
        color: #ccc;
        &:last-child,
        &.active {
            color: #ff9a0d;
        }
    }
}
</style>