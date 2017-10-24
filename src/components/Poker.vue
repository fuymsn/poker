<template>
  <div 
    class="po-poker"
    :class="{ 'po-poker-hl': highlight }"
    @click="selectPoker"
  >{{ pokerData.name }}
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'poker',
  props: ['pokerData'],
  methods: {
    ...mapMutations([
      types.SELECT_POKER,
      types.SUM_ITEM_POINTS,
      types.SUM_POINTS
    ]),
    selectPoker (e) {
      e.preventDefault()
      this[types.SELECT_POKER](this.pokerData.id)
      this[types.SUM_ITEM_POINTS](this.pokerData.id)
      this[types.SUM_POINTS]()
      this.$socket.sendObj({ cmd: 9702002, uid: 2650001, role: 'beauty2', point: 200 })
    }
  },
  computed: {
    ...mapState({
      'currentPoker': state => state.poker.currentPoker
    }),
    highlight () {
      return this.pokerData.id === this.currentPoker
    }
  }
}
</script>

<style scoped>
.po-poker{
    width: 90px;
    height: 120px;
    border-radius: 10px;
    border: 3px solid #ccc;
    cursor: pointer;
    line-height: 120px;
    text-align: center;
    user-select: none;
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