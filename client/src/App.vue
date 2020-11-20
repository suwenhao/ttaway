<template>
  <div class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import io from 'socket.io-client';
import VConsole from 'vconsole'
const socket = io(`ws://localhost:3001`)

@Component({
    name: "App"
})
export default class App extends Vue {
  mounted () {
    socket.on('socketLoad', (res) => {
        console.log(res)
    })
      // var vConsole = new VConsole();
  }
}
</script>

<style>
.app{
  height: 100%;
  width: 100%;
}
</style>
