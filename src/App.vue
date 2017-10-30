<template>
  <div id="app">
    <div class="po-poker-block">
      <poker 
        v-for="poker in pokerData"
        :ref="'p' + poker.id"
        :key="poker.id"
        :pokerInfo="poker"
        ></poker>
    </div>
    <div class="po-chip-block">
      <chip 
        v-for="chip in chipData"
        type='btn'
        :ref="'c' + chip.id"
        :key="chip.id"
        :chipInfo="{ chipId: chip.id }"
        ></chip>
    </div>

    <div ref="chipList">
      <chip 
      v-for="item in chipList" 
      :chipInfo="item"
      :key="item.x"
      :chipStyle="{ transform: 'translate(' + chipCoord[item.chipId-1].x + 'px, ' + chipCoord[item.chipId-1].y + 'px)' }"
      type='move'
      ></chip>
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
      currentSumPoints: state => state.poker.currentSumPoints,
      chipList: state => state.poker.chipList,
      chipCoord: state => state.poker.chipCoord,
      pokerData: state => state.poker.pokerData,
      chipData: state => state.poker.chipData
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
      this[types.SET_POKER_HEIGHT](this.$refs.p1[0].$el.offsetHeight)
      this[types.SET_POKER_WIDTH](this.$refs.p1[0].$el.offsetWidth)
      // 设置chip宽高
      this[types.SET_CHIP_HEIGHT](this.$refs.c1[0].$el.offsetHeight)
      this[types.SET_CHIP_WIDTH](this.$refs.c1[0].$el.offsetWidth)
      // 保存poker数据点
      Object.keys(this.$refs).map((key, index) => {
        let el = that.$refs[key]
        // 如果未定义
        if (!Array.isArray(el)) return

        // 获取ref el
        let refEl = el[0].$el
        // poker coord
        if (/po-poker/.test(refEl.className)) {
          coordPokerArr.push({
            x: refEl.offsetLeft,
            y: refEl.offsetTop
          })
        }
        // chip coord
        if (/po-chip/.test(refEl.className)) {
          coordChipArr.push({
            x: refEl.offsetLeft,
            y: refEl.offsetTop
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
  overflow: hidden;
}

.po-poker-block{
  display: flex;
  justify-content: space-around;
  margin: 0px 2px;
}

.po-chip-block{
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

</style>
