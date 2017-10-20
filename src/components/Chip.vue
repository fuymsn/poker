<template>
<div 
  class="po-chip" 
  :class="{ 'po-chip-hl': highlight }"
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
    highlight () {
      return this.chipData.id === this.currentChip
    }
  }
}
</script>

<style scoped>
.po-chip{
  border-radius: 100px;
  width: 50px;
  height: 50px;
  border: 3px solid #ccc;
  margin: 0px 5px;
  cursor: pointer;
  line-height: 50px;
  font-size: 10px;
  text-align: center;
  user-select: none;
}

.po-chip-hl{
  border: 3px solid red;
}
</style>

