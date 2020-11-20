<template>
    <div class="error-wrap full">
        <div>
            <h1>404</h1>
            <router-link to="/">
                <van-button type="default">点击回主页</van-button>
            </router-link>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Error"
})
export default class Error extends Vue {}
</script>

<style scoped>
.error-wrap {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: gray;
    text-align: center;
}

h1 {
    font-size: 70px;
    color: #fff;
}
</style>