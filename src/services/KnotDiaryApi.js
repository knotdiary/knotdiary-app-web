import ApiClient from './ApiClient';
import { prod, local } from './ApiEnv';
import { clientId, clientSecret } from 'lib/constants';

let baseApiUrl = local.apiUrl;
if (typeof(window) !== 'undefined') {
  baseApiUrl = window.appConfig.env === 'production' ? prod.apiUrl : local.apiUrl;
} else {
  baseApiUrl = process.env.NODE_ENV === 'production' ? prod.apiUrl : local.apiUrl;
}

class KnotDiaryApi extends ApiClient {
  constructor() {
    super(baseApiUrl);
  }

  async getCoupleInfo() {
    const url = 'api/v1/couple';
    return this.get(url);
  }

  async getHomeChecklist(coupleId) {
    const url = `api/v1/couple/${coupleId}/checklist`;
    return this.get(url);
  }
}

export default new KnotDiaryApi();
