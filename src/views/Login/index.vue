<template>
  <div class="login">
    <van-swipe class="h-full swipe" :autoplay="6000" :show-indicators="false">
      <van-swipe-item v-for="(image, index) in images" :key="index" class="swipe-item">
        <img v-lazy="image" class="h-full w-full inline-block" />
      </van-swipe-item>
    </van-swipe>
    <van-image
      class="w-80-px h-80-px fixed top-24 left-1/2 transform -translate-x-1/2"
      round
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F15%2F20200315174816_cknll.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616911165&t=dbb0562b0a54d8404197e2959d7cfc33"
    />
    <van-form class="fixed w-full bottom-20 px-20-px" @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="用户名"
        left-icon="envelop-o"
        class="bg-transparent text-white"
        label=" "
        autocomplete="off"
        :label-width="20"
        :border="false"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="密码"
        left-icon="fire-o"
        class="bg-transparent text-white"
        label=" "
        :label-width="20"
        :border="false"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="m-16-px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <div class=" text-center text-gray-300 text-xs">
        <span>Forget Password</span>
      </div>
    </van-form>
    <van-divider class="w-full fixed bottom-1 box-border px-40-px text-white">
      New here? Sign Up
    </van-divider>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant';

const images = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F22%2F20150822173823_dCSiz.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616908948&t=b618877bad834acba0873a22fdd98cb2',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201512%2F31%2F20151231230540_wufPn.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616908948&t=4a1d966d3ead13620e6012aa85cae98a',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201511%2F08%2F20151108170800_WPsfh.thumb.700_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616908989&t=d0767b595314e190a99b8a5d66367f33',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201510%2F12%2F20151012195349_ZnEMy.jpeg&refer=http%3A%2F%2Fimg3.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616908989&t=6a7ecf2f5555963802355476ffff5919',
  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1088794347,924002720&fm=26&gp=0.jpg',
];

export default {
  name: 'Login',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  created() {
    this.images = images;
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
  },
};
</script>
<style lang="scss" scoped src="@/assets/scss/views/login.module.scss" />
