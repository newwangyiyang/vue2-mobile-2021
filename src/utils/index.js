/**
 * 参考地址: https://juejin.cn/post/6844903696875126798
 * 动态加载插件加载插件，不阻塞正常dom加载，产生页面白屏
 * @param src
 * 在线cdn链接
 *
 * // TODO: 梳理常用工具类，并进行整合 https://juejin.cn/post/6844904090313424903
 */
export const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve('load success');
    };
    // 发生在脚本加载期间的 error 会被 error 事件跟踪到。
    script.onerror = (err) => {
      reject(err);
    };
    document.body.appendChild(script);
  });

/**
 * 开发环境加载VConsole
 */
export const loadVConsoleScript = () =>
  new Promise((resolve, reject) => {
    if (window.VConsole) {
      resolve(window.VConsole);
    } else {
      loadScript('https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js')
        .then((res) => {
          console.log('>>> loadScript:', res);
          if (window.VConsole) {
            // eslint-disable-next-line no-new
            new window.VConsole();
          }
          resolve(window.VConsole);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    }
  });

/**
 * @param { * } file 图片文件
 */
export const fileToBase64 = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    return e.target.result;
  };
};

/**
 * 判断是否是本地开发环境
 */
export const isLocalDev = () => {
  const href = window.location.href || window.location.origin;
  return href.startsWith('http://localhost');
};
