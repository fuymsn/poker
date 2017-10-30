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
  // props: ['chipData', 'type', 'chipStyle'],
  props: ['chipInfo', 'type', 'chipStyle'],
  methods: {
    ...mapMutations([
      types.SELECT_CHIP
    ]),
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
  width: 30px;
  height: 30px;
  margin: 0px 5px;
  cursor: pointer;
  line-height: 30px;
  font-size: 8px;
  text-align: center;
  user-select: none;
  background-image: url(../assets/chip.png);
  background-size: cover;
  color: #fff;
  border: 1px solid #333;
  transition: all 0.5s ease-out;
  transform: translate(0px, 0px);
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.5);
}

.po-chip1{
  background-position: 0px 0px;
}

.po-chip2{
  background-position: -38px 0px;
}

.po-chip3{
  background-position: -76px 0px;
}

.po-chip4{
  background-position: -114px 0px;
}

.po-chip5{
  background-position: -153px 0px;
}

.po-chip6{
  background-position: -191px 0px;
}

.po-chip-hl{
  animation: chipShine 3s infinite;
}

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

