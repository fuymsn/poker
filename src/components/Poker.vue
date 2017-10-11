<template>
  <div 
    class="po-poker"
    :class="{ 'po-poker-hl': highlight }"
    @click="selectPoker"
  >{{ pokerData.name }}
  </div>
</template>

<script>
export default {
  name: 'poker',
  props: ['pokerData'],

  methods: {
    selectPoker (e) {
      e.preventDefault()
      this.$store.commit('selectPoker', this.pokerData.id)
      this.$store.commit('sumItemPoints', this.pokerData.id)
      this.$store.commit('sumPoints')
    }
  },

  computed: {
    highlight () {
      return this.pokerData.id === this.$store.state.currentPoker
    }
  }
}
</script>

<style scoped>
.po-poker{
    width: 90px;
    height: 120px;
    border-radius: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    line-height: 120px;
    text-align: center;
    user-select: none;
}

.po-poker-hl{
  border: 1px solid red;
}
</style>