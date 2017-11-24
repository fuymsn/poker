<template>
  <div 
    class="po-poker"
    :class="pokerComposeClass"
    @click.prevent="selectPoker"
  >{{ pokerInfo.name }}
  </div>
  
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'poker',
  props: ['pokerInfo'],
  data () {
    return {
      // 卡牌背景
      pokerBgDownClass: false,
      pokerBgUpClass: false,
      pokerBgClass: false,
      // 当前每一局卡牌开牌, 开局后保持不变
      currentWinner: 0
    }
  },
  methods: {
    ...mapMutations([
      types.SELECT_POKER,
      types.SUM_POINTS,
      types.UPDATE_CHIP_LIST,
      types.SET_WINNER
    ]),
    // 获取chipItem信息
    getChipItem () {
      // 获取当前押注顶点坐标
      const coord = this.pokerCoord[this.currentBetPoker - 1]
      return {
        pokerId: this.currentBetPoker,
        chipId: this.currentBetChip,
        x: parseInt(coord.x + Math.random() * (this.pokerWidth - this.chipWidth), 10),
        y: -parseInt(coord.y + 40 + Math.random() * (this.pokerHeight - this.chipHeight - 60), 10)
      }
    },
    // bet 押注修改数据
    bet () {
      let that = this

      // 我总的押注信息
      this[types.SUM_POINTS]()

      // 向chiplist推送数据
      this[types.UPDATE_CHIP_LIST](this.getChipItem())

      // 添加移动动画
      setTimeout(() => {
        const lastEle = that.chipList[that.chipList.length - 1]
        that.$parent.$refs.chipList.lastChild.style.setProperty('transform', 'translate(' + lastEle.x + 'px,' + lastEle.y + 'px)')
      }, 10)
    },
    // 选择扑克牌押注
    selectPoker (e) {
      // let that = this
      if (this.currentChip === 0) {
        this.$modal.show('dialog', {
          title: '提示',
          text: '请先选择筹码',
          buttons: [
            { title: '关闭' }
          ]
        })
        return
      }

      // 当前选择的poker
      this[types.SELECT_POKER](this.pokerInfo.id)
      // setTimeout(() => {
      //   that.$el.className = that.$el.className + ' ' + this.pokerBgClass
      // }, 500)
      // this.bet()
      // 向服务器发送数据
      // setTimeout(() => {
      this.$socket.sendObj({
        cmd: 9702002,
        uid: window.userInfo.uid,
        role: this.currentPoker,
        point: this.currentChip
      })
      // })
    }
  },
  computed: {
    ...mapState({
      currentPoker: state => state.poker.currentPoker,
      currentChip: state => state.poker.currentChip,
      pokerHeight: state => state.poker.pokerHeight,
      pokerWidth: state => state.poker.pokerWidth,
      pokerCoord: state => state.poker.pokerCoord,
      chipList: state => state.poker.chipList,
      chipHeight: state => state.poker.chipHeight,
      chipWidth: state => state.poker.chipWidth,
      currentBetPoker: state => state.poker.currentBetPoker,
      currentBetChip: state => state.poker.currentBetChip,
      winner: state => state.poker.winner,
      status: state => state.game.status
    }),
    ...mapGetters({
      chipData: 'chipData',
      getWinnerBgList: 'getWinnerBgList'
    }),
    pokerComposeClass () {
      return {
        'po-poker-hl': this.pokerInfo.id === this.currentPoker,
        ['po-poker' + this.pokerInfo.id]: true,
        'po-bg': this.pokerBgClass,
        'po-poker-flip-down': this.pokerBgDownClass,
        'po-poker-flip-up': this.pokerBgUpClass
      }
    },
    flipClass () {
      return 'po-poker-flip'
    }
  },
  watch: {
    winner (winner) {
      let that = this
      if (winner > 0) {
        this.currentWinner = this.winner
      }
      if (winner) {
        this.pokerBgDownClass = this.pokerInfo.id !== this.winner
        let bgDelayStart = setTimeout(() => {
          that.pokerBgClass = this.pokerInfo.id !== this.winner
          clearTimeout(bgDelayStart)
        }, 500)
        let bgDelayStartStop = setTimeout(() => {
          this.pokerBgDownClass = false
          clearTimeout(bgDelayStartStop)
        }, 2000)
      } else {
        this.pokerBgUpClass = this.pokerInfo.id !== this.currentWinner
        let bgDelayEnd = setTimeout(() => {
          that.pokerBgClass = false
          clearTimeout(bgDelayEnd)
        }, 500)
        let bgDelayEndStop = setTimeout(() => {
          this.pokerBgUpClass = false
          clearTimeout(bgDelayEndStop)
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
.po-poker{
    width: 24vw;
    height: calc(24vw / 0.57);
    border-radius: 10px;
    cursor: pointer;
    line-height: 120px;
    text-align: center;
    user-select: none;
    margin: 0px 2px;
    background-size: cover;
    text-indent: -9999px;
    transform: rotateX(0deg);
    transform-style: preserve-3d;
}

.po-poker1{
    background-image: url(../assets/poker_diao.png)
}
.po-poker2{
    background-image: url(../assets/poker_wang.png)
}
.po-poker3{
    background-image: url(../assets/poker_xi.png)
}
.po-poker4{
    background-image: url(../assets/poker_yang.png)
}
.po-poker-hl{
    animation:chipShine 1s infinite;
}
.po-poker-flip-down{
    animation:flipPokerDown 1s;
}
.po-poker-flip-up{
    animation:flipPokerUp 1s;
}
.po-bg{
    background-image: url(../assets/poker_bg.png);
    transform: rotateY(180deg);
}

@keyframes chipShine {
    0%   { box-shadow: 0px 0px 0px 0px yellow; }
    50%  { box-shadow: 0px 0px 10px 2px yellow; }
    100% { box-shadow: 0px 0px 0px 0px yellow; }
}

@keyframes flipPokerDown {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    background-image: url(../assets/poker_bg.png);
  }
  100% {
    transform: rotateY(180deg);
  }
}

@keyframes flipPokerUp {
  0% { 
    transform: rotateY(180deg);
  }
  50% {
    background-image: url(../assets/poker_bg.png);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>