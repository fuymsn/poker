<template>
  <div id="app">
    <div class="po-poker-block">
      <poker :pokerData="{ id: 1, name: '貂蝉'}"></poker>
      <poker :pokerData="{ id: 2, name: '西施'}"></poker>
      <poker :pokerData="{ id: 3, name: '杨贵妃'}"></poker>
      <poker :pokerData="{ id: 4, name: '如花'}"></poker>
    </div>
    <div class="po-chip-block">
      <chip :chipData="{ id: 1, point: 10, name: '10'}"></chip>
      <chip :chipData="{ id: 2, point: 100, name: '100'}"></chip>
      <chip :chipData="{ id: 3, point: 1000, name: '1000'}"></chip>
      <chip :chipData="{ id: 4, point: 10000, name: '10000'}"></chip>
      <chip :chipData="{ id: 5, point: 100000, name: '100000'}"></chip>
      <chip :chipData="{ id: 6, point: 1000000, name: '1000000'}"></chip>
    </div>

    <div>当前选择的卡片: {{ this.$store.state.currentPoker }}</div>
    <div>当前押注: {{ this.$store.state.currentChip }}</div>
    <div>貂蝉:{{ this.$store.state.currentSumPoints1 }}</div>
    <div>西施:{{ this.$store.state.currentSumPoints2 }}</div>
    <div>杨贵妃:{{ this.$store.state.currentSumPoints3 }}</div>
    <div>如花:{{ this.$store.state.currentSumPoints4 }}</div>
    <div>押注的总点数: {{ this.$store.state.currentSumPoints }}</div>
    <div>操作: <button @click="resetSumPoints">reset</button><button>start</button></div>
  </div>
</template>

<script>
import Poker from './components/Poker'
import Chip from './components/Chip'

export default {
  name: 'app',
  components: {
    Poker,
    Chip
  },
  methods: {
    resetSumPoints () {
      this.$store.commit('resetPoints')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.po-poker-block{
  display: flex;
  justify-content: space-around;
}

.po-chip-block{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
</style>
