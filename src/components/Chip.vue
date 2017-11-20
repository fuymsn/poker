<template>
<div 
  class="po-chip" 
  :class="[chipIdClass, highlightClass]"
  @click.stop="bet"
  :style="chipStyle"
  >{{ chipName }}
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'chip',
  props: ['chipInfo', 'type', 'chipStyle'],
  mounted () {
    // 初始化 chip 数据
    if (this.chipCoord.length < this.bets.length) {
      setTimeout(() => {
        this.initChip()
      }, 100)
    }
  },
  methods: {
    ...mapMutations([
      types.SELECT_CHIP,
      types.SET_CHIP_HEIGHT,
      types.SET_CHIP_WIDTH,
      types.APPEND_CHIP_COORD
    ]),
    initChip () {
      // 获取ref el
      let el = this.$el
      // 设置chip宽高
      this[types.SET_CHIP_HEIGHT](el.offsetHeight)
      this[types.SET_CHIP_WIDTH](el.offsetWidth)
      // chip coord
      if (/po-chip/.test(el.className)) {
        this[types.APPEND_CHIP_COORD]({
          x: el.offsetLeft,
          y: el.offsetTop
        })
      }
    },
    /**
     * @argument
     * 押注
     */
    bet (e) {
      if (this.type === 'move') return
      let id = this.chipInfo.chipId
      let chipItemData = this.getChipItemById(id)
      this[types.SELECT_CHIP]({
        id: chipItemData.id,
        point: chipItemData.point
      })
    }
  },
  computed: {
    ...mapState({
      chipCoord: state => state.poker.chipCoord,
      bets: state => state.game.bets,
      currentChip: state => state.poker.currentChip
    }),
    ...mapGetters({
      getChipItemById: 'getChipItemById'
    }),
    chipName () {
      let id = this.chipInfo.chipId
      let info = this.getChipItemById(id)
      return info.name
    },
    chipIdClass () {
      let typeClass = ''
      if (this.type === 'move') {
        typeClass = 'po-chip-move'
      }
      return 'po-chip' + this.chipInfo.chipId + ' ' + typeClass
    },
    highlightClass () {
      switch (this.type) {
        case 'btn':
          return this.chipInfo.chipId === this.currentChip ? 'po-chip-hl' : ''
        case 'move':
          return 'po-chip-move'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
.po-chip{
  border-radius: 100px;
  width: 25px;
  height: 25px;
  margin: 0px 1px;
  cursor: pointer;
  line-height: 25px;
  font-size: 6px;
  text-align: center;
  user-select: none;
  background-image: url(../assets/chip.png);
  background-size: cover;
  color: #333;
  transition: all 0.5s ease-out;
  transform: translate(0px, 0px);
}

.po-chip1{ background-position: 0px 0px; }
.po-chip2{ background-position: -26px 0px; }
.po-chip3{ background-position: -53px 0px; }
.po-chip4{ background-position: -79px 0px; }
.po-chip5{ background-position: -105px 0px; }
.po-chip6{ background-position: -131px 0px; }
.po-chip-hl{ animation: chipShine 3s infinite; }

.po-chip-move{
  position: absolute;
  left: 0px;
  top: 0px;
  cursor: default;
  margin: 0px;
  pointer-events: none;
}

@keyframes chipShine {
  0%   {box-shadow: 0px 0px 0px 0px yellow;}
  50%  {box-shadow: 0px 0px 10px 2px yellow;}
  100% {box-shadow: 0px 0px 0px 0px yellow;}
}

</style>

