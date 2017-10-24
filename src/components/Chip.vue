<template>
<div 
  class="po-chip" 
  :class="[chipIdClass, highlightClass]"
  @click="bet"
  >{{ chipData.name }}
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'chip',
  props: ['chipData'],

  methods: {
    ...mapMutations([
      types.SELECT_CHIP
    ]),
    bet () {
      this[types.SELECT_CHIP]({ id: this.chipData.id, point: this.chipData.point })
    }
  },

  computed: {
    ...mapState({
      currentChip: state => state.poker.currentChip
    }),
    chipIdClass () {
      return 'po-chip' + this.chipData.id
    },
    highlightClass () {
      return this.chipData.id === this.currentChip ? 'po-chip-hl' : ''
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
  border: 1px solid #eee;
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
  animation:chipShine 3s infinite 
}

@keyframes chipShine {
    0%   {box-shadow: 0px 0px 0px 0px yellow;}
    50%  {box-shadow: 0px 0px 10px 2px yellow;}
    100% {box-shadow: 0px 0px 0px 0px yellow;}
}

</style>

