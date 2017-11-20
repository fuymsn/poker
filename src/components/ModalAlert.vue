<template>
  <transition name="fade">
    <div class="alert" v-if="modalAlertStatus">
      <div class="alert-text">{{ alertText }}</div>
      <div class="alert-mask" v-if="modalAlertMaskStatus"></div>
    </div>
  </transition>
</template>
  
<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'modal-alert',
  data () {
    return {
      alertText: ''
    }
  },
  methods: {
    ...mapMutations([
      types.OPEN_MODAL_ALERT,
      types.CLOSE_MODAL_ALERT,
      types.OPEN_MODAL_ALERT_MASK,
      types.CLOSE_MODAL_ALERT_MASK
    ]),
    /** @description 倒计时 */
    secondCount (timeCost, callback) {
      let resultCountTime = timeCost / 1000
      if (callback) callback(resultCountTime)
      let count = setInterval(() => {
        if (resultCountTime > 0) {
          if (callback) callback(resultCountTime - 1)
          resultCountTime--
        }
        if (resultCountTime === 0) { clearInterval(count) }
      }, 1000)
    }
  },
  computed: {
    ...mapState({
      status: state => state.game.status,
      resultLong: state => state.game.resultLong,
      betLong: state => state.game.betLong,
      modalAlertStatus: state => state.modal.modalAlertStatus,
      modalAlertMaskStatus: state => state.modal.modalAlertMaskStatus
    })
  },
  watch: {
    status (status) {
      if (status) {
        this[types.CLOSE_MODAL_ALERT_MASK]()
        this[types.CLOSE_MODAL_ALERT]()
        // 开启alert
        setTimeout(() => {
          this[types.OPEN_MODAL_ALERT]()
        }, 1000)
        // 触发计时
        this.secondCount(this.betLong, (timeCount) => {
          this.alertText = '押注时间还剩' + timeCount
        })
      } else {
        this[types.OPEN_MODAL_ALERT_MASK]()
        this[types.CLOSE_MODAL_ALERT]()
        // 开启alert
        setTimeout(() => {
          this[types.OPEN_MODAL_ALERT]()
        }, 1000)
        // 触发计时
        this.secondCount(this.resultLong, (timeCount) => {
          this.alertText = '休息一会儿, 即将开始' + timeCount
        })
      }
    }
  }
}
</script>

<style>
.alert{
  width: 100%;
  top: 0px;
  left: 0px;
}

.alert-text{
  background-color: #fff;
  padding: 1px 6px;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.4);
  border-radius: 50px;
  position: absolute;
  left: 50%;
  margin-left: -71px;
  margin-top: 3px;
  user-select: none;
  font-size: 12px;
  z-index: 10;
  text-align: center;
  width: 130px;
  top: 0px;
}

.alert-mask{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 9;
}
</style>