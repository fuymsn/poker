<template>
  <div 
    class="po-connect"
    :class="[connectStateClass]"
    :style="connectStyle"
  ></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'connect-status',
  props: ['connectStyle'],
  computed: {
    ...mapState({
      isConnected: state => state.websocket.isConnected
    }),
    connectStateClass () {
      return this.isConnected ? 'po-connected' : 'po-disconnected'
    }
  }
}
</script>

<style scoped>
.po-connect{
  width: 10px;
  height: 10px;
  right: 5px;
  top: 5px;
  border-radius: 10px;
  position: absolute;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3)
}
.po-connected{
  background-color: #36d149
}
.po-disconnected{
  background-color: #d14836;
}
</style>
