<template>
  <div>
  <home-layout/>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-slider v-model="value2"></el-slider>
  </div>
  </div>
</template>

<script>
    export default {
      name: "home",
      data() {
        return {
          value1: 0,
          value2: 50,
          value3: 36,
          value4: 48,
          value5: 42
        }
      },
      methods: {
        formatTooltip(val) {
          return val / 100;
        }
      }
    }
</script>

<style scoped>

</style>
