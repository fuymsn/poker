<template>
  <div id="app">
    <div class="po-poker-block">
      <poker :pokerData="{ id: 1, name: '貂蝉'}" ref='p1'></poker>
      <poker :pokerData="{ id: 2, name: '西施'}" ref='p2'></poker>
      <poker :pokerData="{ id: 3, name: '贵妃'}" ref='p3'></poker>
      <poker :pokerData="{ id: 4, name: '如花'}" ref='p4'></poker>
    </div>
    <div class="po-chip-block">
      <chip :chipData="{ id: 1, point: 10, name: '10'}" ref='c1'></chip>
      <chip :chipData="{ id: 2, point: 100, name: '100'}" ref='c2'></chip>
      <chip :chipData="{ id: 3, point: 1000, name: '一千'}" ref='c3'></chip>
      <chip :chipData="{ id: 4, point: 10000, name: '一万'}" ref='c4'></chip>
      <chip :chipData="{ id: 5, point: 100000, name: '十万'}" ref='c5'></chip>
      <chip :chipData="{ id: 6, point: 1000000, name: '百万'}" ref='c6'></chip>
    </div>

    <div>
      <chip :chipData="{ id: 1, point: 10, name: '10'}"></chip>
    </div>

    <div>当前选择的卡片: {{ this.currentPoker }}</div>
    <div>当前押注: {{ this.currentChip }}</div>
    <div>貂蝉:{{ this.currentSumPoints1 }}</div>
    <div>西施:{{ this.currentSumPoints2 }}</div>
    <div>杨贵妃:{{ this.currentSumPoints3 }}</div>
    <div>如花:{{ this.currentSumPoints4 }}</div>
    <div>押注的总点数: {{ this.currentSumPoints }}</div>
    <div>操作: <button @click="resetSumPoints">reset</button></div>
    <div>websocket state</div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{ message }}"</p>
    <button @click="pingServer">Ping Server</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Poker from './components/Poker'
import Chip from './components/Chip'
import * as types from './store/mutation-types'

export default {
  name: 'app',
  mounted () {
    this.initPoker()
  },
  components: {
    Poker,
    Chip
  },
  computed: {
    ...mapState({
      isConnected: state => state.websocket.isConnected,
      message: state => state.websocket.message,
      currentPoker: state => state.poker.currentPoker,
      currentChip: state => state.poker.currentChip,
      currentSumPoints1: state => state.poker.currentSumPoints1,
      currentSumPoints2: state => state.poker.currentSumPoints2,
      currentSumPoints3: state => state.poker.currentSumPoints3,
      currentSumPoints4: state => state.poker.currentSumPoints4,
      currentSumPoints: state => state.poker.currentSumPoints
    })
  },
  methods: {
    ...mapMutations([
      types.RESET_POINTS,
      types.SET_POKER_HEIGHT,
      types.SET_POKER_WIDTH,
      types.SET_POKER_COORD,
      types.SET_CHIP_HEIGHT,
      types.SET_CHIP_WIDTH,
      types.SET_CHIP_COORD
    ]),
    resetSumPoints () {
      this[types.RESET_POINTS]()
    },
    pingServer () {
      this.$socket.send('pong')
    },
    initPoker () {
      const coordPokerArr = []
      const coordChipArr = []
      const that = this
      // 设置poker宽高
      this[types.SET_POKER_HEIGHT](this.$refs.p1.$el.offsetHeight)
      this[types.SET_POKER_WIDTH](this.$refs.p1.$el.offsetWidth)
      // 设置chip宽高
      this[types.SET_CHIP_HEIGHT](this.$refs.c1.$el.offsetHeight)
      this[types.SET_CHIP_WIDTH](this.$refs.c1.$el.offsetWidth)
      // 保存poker数据点
      Object.keys(this.$refs).map((key, index) => {
        let el = that.$refs[key].$el
        if (el.className === 'po-poker') {
          coordPokerArr.push({
            x: el.offsetLeft,
            y: el.offsetTop
          })
        }

        if (/po-chip/.test(el.className)) {
          coordChipArr.push({
            x: el.offsetLeft,
            y: el.offsetTop
          })
        }
      })
      this[types.SET_POKER_COORD](coordPokerArr)
      this[types.SET_CHIP_COORD](coordChipArr)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;
}

.po-poker-block{
  display: flex;
  justify-content: space-around;
}

.po-chip-block{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
</style>
