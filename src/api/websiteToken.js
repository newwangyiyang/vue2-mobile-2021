import services from '@/config/axios';
import baseUrl from './baseUrl';

const websiteToken = {
  tokenLogin(params) {
    return services.post(`${baseUrl.testBaseUrl}/login`, params);
  },
  tokenLogout() {
    return services.post(`${baseUrl.testBaseUrl}/logout`);
  },
  tokenRefresh(username) {
    return services.post(`${baseUrl.testBaseUrl}/refreshTokenZForWeb/${username}`);
  },
};

export default websiteToken;
