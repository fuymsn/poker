<template>
  <div 
    class="po-poker"
    :class="[chipIdClass, highlightClass]"
    @click.prevent="selectPoker"
  >{{ pokerInfo.name }}
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'poker',
  props: ['pokerInfo'],
  created () {
    this.$on('bet', this.bet)
  },
  methods: {
    ...mapMutations([
      types.SELECT_POKER,
      types.SUM_ITEM_POINTS,
      types.SUM_POINTS,
      types.UPDATE_CHIP_LIST
    ]),

    // 获取chipItem信息
    getChipItem () {
      // 获取当前押注顶点坐标
      const coord = this.pokerCoord[this.currentPoker - 1]

      return {
        pokerId: this.currentPoker,
        chipId: this.currentChip,
        x: parseInt(coord.x + Math.random() * (this.pokerWidth - this.chipWidth), 10),
        y: parseInt(coord.y + 30 + Math.random() * (this.pokerHeight - this.chipHeight - 30), 10)
      }
    },
    // bet 押注修改数据
    bet (e) {
      let that = this
      this[types.SELECT_POKER](this.pokerInfo.id)
      this[types.SUM_ITEM_POINTS](this.pokerInfo.id)
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
      this.bet()
      // 向服务器发送数据
      this.$socket.sendObj({
        cmd: 9702002,
        uid: window.userInfo.uid,
        role: this.currentPoker,
        point: this.chipData[this.currentChip - 1].point
      })
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
      chipData: state => state.poker.chipData
    }),
    chipIdClass () {
      return 'po-poker' + this.pokerInfo.id
    },
    highlightClass () {
      return this.pokerInfo.id === this.currentPoker ? 'po-poker-hl' : ''
    }
  }
}
</script>

<style scoped>
.po-poker{
    width: 75px;
    height: 131px;
    border-radius: 10px;
    cursor: pointer;
    line-height: 120px;
    text-align: center;
    user-select: none;
    margin: 10px 2px;
    background-size: cover;
    text-indent: -9999px;
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
    animation:chipShine 3s infinite 
}

@keyframes chipShine {
    0%   { box-shadow: 0px 0px 0px 0px yellow; }
    50%  { box-shadow: 0px 0px 10px 2px yellow; }
    100% { box-shadow: 0px 0px 0px 0px yellow; }
}

</style>