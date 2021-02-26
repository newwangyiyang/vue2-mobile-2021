# vue2.0 版本移动端开发模版(2021)

### 1. [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)

- `eslint`、`prettier`

### 2. [vant](https://youzan.github.io/vant/#/zh-CN/home)

- `vant`: 按需加载

  - `babel-plugin-import`
  - 这里无需额外引入全局 css 样式

  ```js
  // babel.config.js
  module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [['import', { libraryName: 'vant', libraryDirectory: 'es', style: true }, 'vant']],
  };
  ```

  - 将`vant`组件局部注册

    - 要用到组件的 name 属性
    - `{[Button.name]: Button}`

    ```vue
    <template>
      <van-button type="primary" size="large">按钮</van-button>
    </template>
    <script>
    import { Button } from 'vant';

    export default {
      name: 'Home',
      components: {
        [Button.name]: Button,
      },
    };
    </script>
    ```

* `viewport`

  - [git 地址](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)

  - `autoprefixer`、`postcss-px-to-viewport`

    ```javascript
    // vue.config.js
    const autoprefixer = require('autoprefixer');
    const pxtoviewport = require('postcss-px-to-viewport');

    module.exports = {
      outputDir: 'dist',
      publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
      css: {
        loaderOptions: {
          postcss: {
            plugins: [
              autoprefixer(),
              pxtoviewport({
                // 视窗的宽度，对应的是我们设计稿的宽度，我们公司用的是375
                viewportWidth: 375,
                // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                // viewportHeight: 1334,
                // 指定`px`转换为视窗单位值的小数位数
                unitPrecision: 3,
                // 指定需要转换成的视窗单位，建议使用vw
                viewportUnit: 'vw',
                // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                selectorBlackList: ['.ignore'],
                // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
                minPixelValue: 1,
                // 允许在媒体查询中转换`px`
                mediaQuery: false,
              }),
            ],
          },
        },
      },
    };
    ```

### 3. `vh-check`

- 处理 safari/chrome 浏览器工具栏 TopBar 100vh 问题

  - 实际 100vh 高度会超过屏幕高度，跟预期不一致

- [git 地址](https://github.com/Hiswe/vh-check)

  ```vue
  <script>
  import vhCheck from 'vh-check';
  // browser-address-bar: 该变量可用于css中，处理高度问题
  vhCheck('browser-address-bar');
  export default {
    render(h) {
      return h('div', { class: { home: true } });
    },
  };
  </script>
  <style lang="scss" scoped>
  @mixin vh($height: 100vh) {
    height: $height;
    height: calc(#{$height} - var(--browser-address-bar, 0px));
  }
  .home {
    @include vh();
  }
  </style>
  ```

### 4. `tailwindcss`

- 原子类封装

- 推荐使用`::v-deep`重置组件样式

  ```scss
  ::v-deep .van-field__control {
    color: #fff;
  }
  ```

- 依赖项

  ```yaml
  yarn add tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 -D
  ```

- 引入原子类

  ```js
  import 'tailwindcss/tailwind.css';
  ```

### 5. 打包优化

- gzip 压缩需注意插件版本: `*"compression-webpack-plugin"*: "^6.1.1"`
  - 最新版会报错
