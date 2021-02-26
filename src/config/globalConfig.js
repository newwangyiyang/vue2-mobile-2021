import vhCheck from 'vh-check';
import { Button, Cell, CellGroup, Lazyload, Field, Form, Image, Divider } from 'vant';
import * as filters from '@/utils/filters';
import { loadVConsoleScript, isLocalDev } from '@/utils';

import usePermission from '@/utils/permission';

const globalConfig = {
  baseSetting: {
    install(Vue) {
      usePermission();
      vhCheck('browser-address-bar');
      !isLocalDev() && loadVConsoleScript();
      // 不开启生产环境提示
      Vue.config.productionTip = false;
    },
  },
  components: {
    install(Vue) {
      Vue.use(Button)
        .use(Cell)
        .use(CellGroup)
        .use(Lazyload)
        .use(Form)
        .use(Field)
        .use(Image)
        .use(Divider);
    },
  },
  filters: {
    install(Vue) {
      Object.keys(filters).forEach((filterName) => {
        Vue.filter(filterName, filters[filterName]);
      });
    },
  },
};

export default globalConfig;
