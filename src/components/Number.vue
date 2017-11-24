<template>
  <div class="po-num">
    <div class="po-num-self">{{ selfNum }}</div>
    <div class="po-num-sums">{{ serverNum }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'number',
  props: ['numInfo'],
  computed: {
    ...mapGetters({
      getCurrentSumPointsItemById: 'getCurrentSumPointsItemById',
      getSumPointsItemById: 'getSumPointsItemById'
    }),
    selfNum () {
      return this.getCurrentSumPointsItemById(this.numInfo.id - 1)
    },
    serverNum () {
      return this.getSumPointsItemById(this.numInfo.id - 1)
    }
  }
}
</script>

<style scoped>
.po-num{
    width: 50px;
    user-select: none;
}

.po-num-self{
  font-size: 12px;
  font-weight: 700;
  color: #ffef00;
  line-height: 20px;
  border-bottom: 2px solid #eee;
  text-shadow: 1px  1px 0px rgba(0,0,0,0.7),
    1px -1px 0px rgba(0,0,0,0.7),
   -1px  1px 0px rgba(0,0,0,0.7),
   -1px -1px 0px rgba(0,0,0,0.7);
}

.po-num-sums{
  font-size: 13px;
  font-weight: 700;
  color: #333;
  line-height: 20px;
  text-shadow: 1px  1px 0px rgba(255,255,2550,0.7),
    1px -1px 0px rgba(255,255,255,0.7),
   -1px  1px 0px rgba(255,255,255,0.7),
   -1px -1px 0px rgba(255,255,255,0.7);
}
</style> 