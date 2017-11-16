<template>
  <transition name="fade">
    <div class="alert" v-if="modalAlertStatus">
      <div class="alert-text">{{ modalAlertText }}</div>
      <div class="alert-mask" v-if="modalAlertMaskStatus"></div>
    </div>
  </transition>
</template>
  
<script>
import { mapState } from 'vuex'

export default {
  name: 'modal-alert',
  props: ['alertText', 'showMask'],
  computed: {
    ...mapState({
      modalAlertStatus: state => state.modal.modalAlertStatus,
      modalAlertMaskStatus: state => state.modal.modalAlertMaskStatus,
      modalAlertText: state => state.modal.modalAlertText
    })
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