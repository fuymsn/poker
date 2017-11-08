<template>
  <modal name="modal-tip" width="150" height="auto" data-modal="modal-tip">
    {{ modalTipText }}
  </modal>
</template>
  
<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'modal-tip',
  props: ['modalText'],
  computed: {
    ...mapState({
      modalTipStatus: state => state.modal.modalTipStatus,
      modalTipText: state => state.modal.modalTipText
    })
  },
  methods: {
    ...mapMutations([
      types.CLOSE_MODAL_TIP
    ]),
    show () {
      let that = this
      this.$modal.show('modal-tip')
      setTimeout(() => {
        that.$modal.hide('modal-tip')
        that[types.CLOSE_MODAL_TIP]()
      }, 1500)
    }
  },
  watch: {
    modalTipStatus () {
      if (this.modalTipStatus === 1) {
        this.show()
      }
    }
  }
}
</script>

<style>
/* modal rewrite */
.v--modal-overlay[data-modal='modal-tip'] .v--modal{
  padding: 10px;
  text-align: center;
}
</style>