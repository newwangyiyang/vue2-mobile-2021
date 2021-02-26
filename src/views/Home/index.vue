<template>
  <div class="home flex flex-col-reverse items-center justify-between">
    <div v-for="(item, index) in 10" :key="item" :class="{ 'bg-red-300': index !== 0, 'text-white': true }">
      {{ item }}
    </div>
    <div class="border-box h-50-px w-full bg-red-400 flex items-center justify-center rounded-2xl">
      <div class=" w-100-px h-20-px text-white text-center lh-20-px">{{ token }}</div>
    </div>
    <div class="w-full text-center lh-100-px font-bold rounded-full bg-red-500 text-white text-2xl">{{ msg }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import websiteManageApi from '@/api/websiteManageApi';
import { ModelState } from '@/config/globalContant';

export default {
  name: 'Home',
  data() {
    return {
      msg: '',
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  mounted() {
    this.initHelloWorld();
  },
  methods: {
    initHelloWorld() {
      const that = this;
      websiteManageApi.helloWorld().then((res) => {
        if (res.code === ModelState.SUCCESS) {
          that.msg = res.data || '';
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped src="@/assets/scss/views/home.module.scss"></style>
