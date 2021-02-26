/**
 * 网站公用接口定义
 *
 */
import services from '@/config/axios';
import baseUrl from '@/api/baseUrl';

const websiteManageApi = {
  // helloWorld
  helloWorld() {
    return services.get(`${baseUrl.testBaseUrl}/hello/world`);
  },
};

export default websiteManageApi;
