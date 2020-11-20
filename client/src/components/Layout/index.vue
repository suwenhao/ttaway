<template>
    <div class="layout">
        <div class="content">
            <router-view/>
        </div>
        <div class="footer">
            <Footer/>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import Footer from './Footer.vue'
    @Component({
        components: {
            Footer
        }
    })
    export default class Layout extends Vue {

    }
</script>
<style lang="less" scoped>
    .layout{
        width: 100vw;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        justify-content: space-between;
        .content{
            flex: 1;
            overflow: hidden;
        }
        .footer {
            height: 51px;
            box-shadow: 0 -0.266667vw 0.533333vw rgba(4,4,4,.1);
        }
    }
</style>