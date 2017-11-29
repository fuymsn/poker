<template>
  <div id="app">
    <div class="po-num-block">
      <number
        v-for="item in pokerData"
        :key="item.id"
        :numInfo="item"
      >
      </number>
    </div>
    <div class="po-poker-block">
      <poker 
        v-for="poker in pokerData"
        :ref="'p' + poker.id"
        :key="poker.id"
        :pokerInfo="poker"
        ></poker>
    </div>
    <div class="po-chip-block">
      <point></point>
      <chip 
        v-for="chip in chipData"
        type='btn'
        :ref="'c' + chip.id"
        :key="chip.id"
        :chipInfo="{ chipId: chip.id }"
        ></chip>
    </div>
    <div class="po-chip-animation" ref="chipList">
      <chip 
      v-for="item in chipList" 
      :chipInfo="item"
      :key="item.x"
      :chipStyle="{ transform: 'translate(' + chipCoord[item.chipId-1].x + 'px, -' + chipHeight + 'px)' }"
      type='move'
      ></chip>
    </div>
    <v-dialog width="280" :clickToClose="false"></v-dialog>
    <!-- <Test></Test> -->
    <modal-tip></modal-tip>
    <transition name="fade">
      <div class="dialog" v-if="dialogStatus">
        <div class="dialog-title"></div>
        <div class="dialog-content" v-html="dialogText"></div>
      </div>
    </transition>
    <modal-alert></modal-alert>
    <connect-status></connect-status>
  </div>
  
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Poker from './components/Poker'
import Chip from './components/Chip'
import Test from './components/Test'
import Point from './components/Point'
import Number from './components/Number'
import ModalTip from './components/ModalTip'
import ModalAlert from './components/ModalAlert'
import ConnectStatus from './components/ConnectStatus'
import * as types from './store/mutation-types'

export default {
  name: 'app',
  mounted () {
    let that = this
    // 游戏创建完成
    this[types.CREATED]()
    this.initPoker()

    // 启动心跳
    this.heartBeatInterval = setInterval(() => {
      that.pingServer()
      // 如果socket没有回应
      // 如果心跳停止，停止发送
      if (!that.heartBeatStatus) {
        clearInterval(that.heartBeatInterval)
      }
    }, 10000)
  },
  data () {
    return {
      MSG_GAME_START: '游戏开始<br/>选择筹码, 点击美女开始押注',
      MSG_GAME_ROUND_RESULT: '本局开奖结果: ',
      MSG_GAME_ROUND_PRICE: '您在本局中<br/>',
      resultCountTime: 0,
      heartBeatInterval: null,
      heartBeatSendStatus: 0 // 发送状态: 有回应1, 没有回应0
    }
  },
  components: {
    Poker,
    Chip,
    Test,
    Point,
    Number,
    ModalTip,
    ModalAlert,
    ConnectStatus
  },
  computed: {
    ...mapState({
      message: state => state.websocket.message,
      chipList: state => state.poker.chipList,
      chipCoord: state => state.poker.chipCoord,
      pokerData: state => state.poker.pokerData,
      chipHeight: state => state.poker.chipHeight,
      dialogText: state => state.modal.dialogText,
      dialogStatus: state => state.modal.dialogStatus,
      heartBeatStatus: state => state.game.heartBeatStatus,
      isConnected: state => state.websocket.isConnected,
      heartBeatCount: state => state.game.heartBeatCount
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
      types.OPEN_DIALOG,
      types.CLOSE_DIALOG,
      types.SET_BET_POKER_FROM_SERVER,
      types.SET_BET_CHIP_FROM_SERVER,
      types.SET_SELF_ITEM_POINTS,
      types.CREATED,
      types.SET_WINNER,
      types.SET_POINT,
      types.STOP_HEART_BEAT,
      types.DISCONNECTED_COUNT
    ]),
    pingServer () {
      let that = this
      // 发送心跳111
      this.$socket.sendObj({
        cmd: 9702111
      })
      this.heartBeatSendStatus = 0
      setTimeout(() => {
        // 如果没有回应, 加1次
        if (!that.heartBeatSendStatus) {
          that[types.DISCONNECTED_COUNT]()
        }
      }, 5000)
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
            y: refEl.parentElement.offsetTop // fix ios's offset value is different from others platform
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
    showDisconnectedDialog () {
      this.$modal.show('dialog', {
        title: '提示',
        text: '网络已经断开, 请稍后再试或点击"重连"',
        buttons: [
          { title: '重连', handler: () => { location.reload() } },
          { title: '关闭' }
        ]
      })
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
            resultLong: msg.resultlong,
            point: msg.point,
            status: msg.state
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
          this[types.SET_POINT](msg.point)
          break
        // 全服广播押注 important
        case 9702004:
          this[types.SET_SUM_ITEM_POINTS](msg.beauty)
          break
        // 全服广播输赢中奖
        case 9702005:
          this[types.SET_WINNER](msg.winner)
          this[types.END_GAME]()
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
          }, 4000)
          this[types.SET_POINT](msg.point)
          break
        // 新的一局游戏开始
        case 9702007:
          // this.showModalTip(this.MSG_GAME_START)
          this[types.RESET_POINTS]()
          this[types.OPEN_DIALOG]({ text: this.MSG_GAME_START })
          this[types.START_GAME]()
          // 重置胜利卡牌
          this[types.SET_WINNER](0)
          let startDialog = setTimeout(() => {
            this[types.CLOSE_DIALOG]()
            clearTimeout(startDialog)
          }, 2000)
          break
        // 报错
        case 9702099:
          this.showModalTip(msg.content)
          break
        // 心跳
        case 9702111:
          // 如果回应，但是回应太慢，同样会断开并重连
          // 如果没有回应，则在未回应处处理
          this.heartBeatSendStatus = 1
          break
        default:
          break
      }
    },
    // 心跳监听
    heartBeatStatus (heartBeatStatus) {
      if (!heartBeatStatus) {
        this.showDisconnectedDialog()
      }
    },
    // 如果断开连接, 显示断开弹窗提示
    isConnected (isConnected) {
      if (!isConnected) {
        this.showDisconnectedDialog()
        // 停止心跳计算
        clearInterval(this.heartBeatInterval)
      }
    },
    // 判断如果两次以上没有回应, 则断开
    heartBeatCount (heartBeatCount) {
      if (heartBeatCount > 2) {
        this[types.STOP_HEART_BEAT]()
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
  /* opacity: 0.8; */
}

.po-poker-block{
  display: flex;
  justify-content: space-around;
  margin: 28px 2px 0px 2px;
  perspective: 1200px;
}

.po-num-block{
  display: flex;
  justify-content: space-around;
  margin: 35px 2px 0px 2px;
  position: absolute;
  z-index: 10;
  width: 100%;
}

.po-chip-block{
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  align-items: center;
}
.po-chip-animation{
  position: relative;
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
  z-index: 11;
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
