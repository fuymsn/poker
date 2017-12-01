<template>
  <div>
    <p>
      <div>押注的总点数: {{ this.currentSumPoints }}</div>
      <div>操作: 
        <button @click="resetSumPoints">重制</button>
        <button @click="closeWS">关闭WS</button>
        <button @click="getGameInfo">001</button>
        <button @click="disPing">dis心跳+1</button>
        <button @click="pingServer">心跳</button>
        <button @click="sendError">WS error</button>
      </div>
    </p>
    <p>Message from server: "{{ message }}"</p>
    <div style="height: 300px; overflow-y: scroll">
      Message List from server: <div v-for="item in messageList" :key="item.cmd">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'test',
  computed: {
    ...mapState({
      currentSumPoints: state => state.poker.currentSumPoints,
      message: state => state.websocket.message,
      messageList: state => state.websocket.messageList
    })
  },
  methods: {
    ...mapMutations([
      types.RESET_POINTS,
      types.HEART_BEAT_DISCONNECTED_COUNT
    ]),
    resetSumPoints () {
      this[types.RESET_POINTS]()
    },
    closeWS () {
      this.$socket.close()
    },
    getGameInfo () {
      // 手动获取游戏信息
      this.$socket.sendObj({
        cmd: 9702001,
        uid: window.userInfo.uid
      })
    },
    pingServer () {
      this.$socket.sendObj({
        cmd: 9702111
      })
    },
    disPing () {
      this[types.HEART_BEAT_DISCONNECTED_COUNT]()
    },
    sendError () {
      this.$socket.sendObj({
        cmd: 9702666
      })
    }
  }
}
</script>

<style scoped>

</style>
