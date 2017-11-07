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
    <div class="po-num-block">
      <number
        v-for="item in pokerData"
        :key="item.id"
        :numInfo="item"
      >
      </number>
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
    <p>
      <div>押注的总点数: {{ this.currentSumPoints }}</div>
      <div>操作: 
        <button @click="resetSumPoints">重制</button>
        <button @click="closeWS">关闭WS</button>
        <button @click="pingServer">Ping Server</button>
      </div>
    </p>
    <p>Message from server: "{{ message }}"</p>
    <div style="height: 300px; overflow-y: scroll">Message List from server: <div v-for="item in messageList" :key="item.cmd">{{ item }}</div></div>
    <v-dialog name="tips" width="280"></v-dialog>
    <modal-tip></modal-tip>
    <transition name="fade">
      <div class="mask" v-if="maskStatus">
        <div class="mask-text">休息一会儿, 即将开始 {{ resultCountTime }}</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="dialog" v-if="dialogStatus">
        <div class="dialog-title"></div>
        <div class="dialog-content" v-html="dialogText"></div>
      </div>
    </transition>
    <connect-status></connect-status>
  </div>
  
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Poker from './components/Poker'
import Chip from './components/Chip'
import Number from './components/Number'
import ModalTip from './components/ModalTip'
import ConnectStatus from './components/ConnectStatus'
import * as types from './store/mutation-types'

export default {
  name: 'app',
  mounted () {
    // 游戏创建完成
    this[types.CREATED]()
    this.initPoker()
  },
  data () {
    return {
      MSG_GAME_START: '游戏开始<br/>选择筹码, 点击美女开始押注',
      MSG_GAME_ROUND_RESULT: '本局开奖结果: ',
      MSG_GAME_ROUND_PRICE: '您在本局中<br/>',
      resultCountTime: 0
    }
  },
  components: {
    Poker,
    Chip,
    Number,
    ModalTip,
    ConnectStatus
  },
  computed: {
    ...mapState({
      message: state => state.websocket.message,
      messageList: state => state.websocket.messageList,
      currentPoker: state => state.poker.currentPoker,
      currentSumPoints: state => state.poker.currentSumPoints,
      chipList: state => state.poker.chipList,
      chipCoord: state => state.poker.chipCoord,
      pokerData: state => state.poker.pokerData,
      maskStatus: state => state.modal.maskStatus,
      dialogStatus: state => state.modal.dialogStatus,
      dialogText: state => state.modal.dialogText,
      resultLong: state => state.game.resultLong,
      status: state => state.game.status
    }),
    ...mapGetters({
      chipData: 'chipData'
    })
  },
  methods: {
    ...mapMutations([
      types.RESET_POINTS,
      types.SET_POKER_HEIGHT,
      types.SET_POKER_WIDTH,
      types.SET_POKER_COORD,
      types.OPEN_MODAL_TIP,
      types.SET_MODAL_TIP_TEXT,
      types.SET_SUM_ITEM_POINTS,
      types.INIT_GAME,
      types.END_GAME,
      types.START_GAME,
      types.OPEN_MASK,
      types.CLOSE_MASK,
      types.OPEN_DIALOG,
      types.CLOSE_DIALOG,
      types.SET_BET_POKER_FROM_SERVER,
      types.SET_BET_CHIP_FROM_SERVER,
      types.SET_SELF_ITEM_POINTS,
      types.CREATED,
      types.SET_WINNER
    ]),
    resetSumPoints () {
      this[types.RESET_POINTS]()
    },
    pingServer () {
      this.$socket.sendObj({
        cmd: 9702001,
        uid: window.userInfo.uid
      })
    },
    initPoker () {
      const coordPokerArr = []
      const that = this
      // 设置poker宽高
      this[types.SET_POKER_HEIGHT](this.$refs.p1[0].$el.offsetHeight)
      this[types.SET_POKER_WIDTH](this.$refs.p1[0].$el.offsetWidth)

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
      })
      this[types.SET_POKER_COORD](coordPokerArr)
    },
    showModalTip (text) {
      this[types.OPEN_MODAL_TIP]()
      this[types.SET_MODAL_TIP_TEXT](text)
    },
    initGame (gameInfo) {
      this[types.INIT_GAME](gameInfo)
    },
    closeWS () {
      this.$socket.close()
    }
  },
  watch: {
    // websocket 返回的数据监听
    message (msg) {
      switch (msg.cmd) {
        // 用户登录
        case 9702001:
          this.initGame({
            beginTime: msg.begtime,
            currentTime: msg.currtime,
            bets: msg.bets,
            betLong: msg.betlong,
            resultLong: msg.resultlong
          })
          break
        // 押注
        case 9702002:
          this[types.SET_BET_POKER_FROM_SERVER](msg.role)
          this[types.SET_BET_CHIP_FROM_SERVER](msg.point)
          this.$refs['p' + msg.role][0].bet()
          break
        // 用户单点推送押注信息
        case 9702003:
          // 我的押注
          this[types.SET_SELF_ITEM_POINTS]({ id: msg.role, point: msg.total })
          break
        // 全服广播押注 important
        case 9702004:
          msg.beauty.map((key, index) => {
            this[types.SET_SUM_ITEM_POINTS]({ id: index + 1, point: key })
          })
          break
        // 全服广播输赢中奖
        case 9702005:
          // this.showModalTip(this.MSG_GAME_ROUND_RESULT + this.pokerData[msg.winner - 1].name)
          this[types.SET_WINNER](msg.winner)
          this[types.END_GAME]()
          this[types.OPEN_MASK]()
          break
        // 单点推送中奖
        case 9702006:
          let priceState = ''
          if (msg.prize > 0) {
            priceState = '赢得'
          } else {
            priceState = '输掉'
          }
          this[types.OPEN_DIALOG]({ text: this.MSG_GAME_ROUND_PRICE + priceState + Math.abs(msg.prize) + '钻' })
          let winDialog = setTimeout(() => {
            this[types.CLOSE_DIALOG]()
            clearTimeout(winDialog)
          }, 3000)
          break
        // 新的一局游戏开始
        case 9702007:
          // this.showModalTip(this.MSG_GAME_START)
          this[types.RESET_POINTS]()
          this[types.OPEN_DIALOG]({ text: this.MSG_GAME_START })
          this[types.START_GAME]()
          this[types.CLOSE_MASK]()
          // 重置胜利卡牌
          this[types.SET_WINNER](0)
          let startDialog = setTimeout(() => {
            this[types.CLOSE_DIALOG]()
            clearTimeout(startDialog)
          }, 2000)
          break
        case 9702099:
          this.showModalTip(msg.content)
          break
        default:
          break
      }
    },
    status (status) {
      this.resultCountTime = this.resultLong / 1000
      if (status === 0) {
        let count = setInterval(() => {
          if (this.resultCountTime > 0) {
            this.resultCountTime --
          }
          if (this.resultCountTime === 0) { clearInterval(count) }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
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
  margin-top: 10px;
  perspective: 1200px;
}

.po-num-block{
  display: flex;
  justify-content: space-around;
  margin: 0px 2px;
}

.po-chip-block{
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.mask{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.2)
}

.mask-text{
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.4);
  border-radius: 50px;
  position: absolute;
  left: 50%;
  margin-left: -82px;
  margin-top: 20px;
  user-select: none;
  font-size: 12px;
}

.dialog{
  width: 150px;
  height: 78px;
  background-image: url(./assets/tip.png);
  background-size: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -75px;
  margin-top: -39px;
  color: #ffcf90;
  padding: 13px 20px;
  box-sizing: border-box;
}
.dialog-title{

}
.dialog-content{
  font-size: 11px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}
</style>
