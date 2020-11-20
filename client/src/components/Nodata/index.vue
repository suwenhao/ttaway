<template>
    <div class="no-data">
        {{title}}
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component({
        name: "Nodata"
    })
    export default class Nodata extends Vue {
        @Prop({
            type: String,
            default: '无结果'
        })
        readonly title!: string;
    }
</script>
<style lang="less" scoped>
    .no-data{
        width: 100%;
        padding: 100px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #222;
        font-size: 14px;
        text-align: center;
    }
</style>