<template>
  <div class="po-point">
    <button class="po-charge-btn" @click="charge">充值</button>
    <div class="po-diamond"></div>
    <div class="po-diamond-num">{{ point }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ClientAPI from '../api/client'

export default {
  name: 'point',
  computed: {
    ...mapState({
      point: state => state.game.point
    })
  },
  methods: {
    charge () {
      ClientAPI.chargeAction()
    }
  }
}
</script>

<style scoped>
.po-point{
  z-index: 15;
  margin-left: 5px;
}

.po-diamond{
  background-image: url(../assets/diamond.png);
  width: 15px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
}

.po-diamond-num{
  text-shadow: 1px 1px 0px rgba(0,0,0,0.5), 1px -1px 0px rgba(0,0,0,0.5), -1px 1px 0px rgba(0,0,0,0.5), -1px -1px 0px rgba(0,0,0,0.5);
  font-size: 14px;
  font-weight: 700;
  color: #ffef00;
  line-height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.po-charge-btn{
  background-color: #f8065d;
  border: 0px;
  color: #fff;
  font-size: 10px;
  border-radius: 5px;
  width: 40px;
  height: 22px;
  line-height: 22px;
}
</style>


