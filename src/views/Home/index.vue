<template>
  <div class="home flex flex-col-reverse items-center justify-between">
    <div v-for="(item, index) in 10" :key="item" :class="{ 'bg-red-300': index !== 0, 'text-white': true }">
      {{ item }}
    </div>
    <div class="border-box h-50-px w-full bg-red-400 flex items-center justify-center rounded-2xl">
      <div class=" w-100-px h-20-px text-white text-center lh-20-px">wangyiyang</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['token']),
  },
};
</script>
<style lang="scss" scoped src="@/assets/scss/views/home.module.scss"></style>
