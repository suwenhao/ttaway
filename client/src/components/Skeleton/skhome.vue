<template>
    <div class="skhome">
        <ul>
            <li :key="i" v-for="i in 10">
                <div>
                    <i></i>
                    <span></span>
                </div>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    .skhome{
        ul{
            min-height: 180px;
            max-height: 180px;
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            li{
                flex: 0 0 20%;
                margin-top: 15px;
                div{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    i{
                        width: 50px;
                        height: 50px;
                        background-color: #eee;
                        border-radius: 50px;
                    }
                    span{
                        margin-top: 5px;
                        width: 44px;
                        height: 15px;
                        background-color: #eee;
                    }
                }
            }
        }
    }
</style>