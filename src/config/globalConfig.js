import vhCheck from 'vh-check';
import { Button, Cell, CellGroup } from 'vant';
import * as filters from '@/utils/filters';
import { loadVConsoleScript } from '@/utils';

const globalConfig = {
  baseSetting: {
    install(_Vue) {
      vhCheck('browser-address-bar');
      loadVConsoleScript();
    },
  },
  components: {
    install(Vue) {
      Vue.use(Button)
        .use(Cell)
        .use(CellGroup);
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
