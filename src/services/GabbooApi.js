import ApiClient from './ApiClient';
import { prod, local } from './ApiEnv';
import { clientId, clientSecret } from 'lib/constants';

let baseApiUrl = local.apiUrl;
if (typeof(window) !== 'undefined') {
  baseApiUrl = window.appConfig.env === 'production' ? prod.apiUrl : local.apiUrl;
} else {
  baseApiUrl = process.env.NODE_ENV === 'production' ? prod.apiUrl : local.apiUrl;
}

class GabbooApi extends ApiClient {
  constructor() {
    super(baseApiUrl);
  }

  async login(username, password) {
    const url = 'api/v1/auth/login';
    const model = `grant_type=password&username=${username}&password=${password}&client_id=${clientId}&client_secret=${clientSecret}`;

    return this.post(url, model, 'application/x-www-form-urlencoded');
  }

  async updateUserAvatar(username, file) {
    const url = `api/v1/user/${username}/avatar`
    const formData = new FormData();
    formData.append('file', file);

    return this.post(url, formData, 'multipart/form-data');
  }

  async updateUserBackground(username, file) {
    const url = `api/v1/user/${username}/background`
    const formData = new FormData();
    formData.append('file', file);

    return this.post(url, formData, 'multipart/form-data');
  }

  async getUser() {
    const url = 'api/v1/user';
    return this.get(url);
  }

  async createUser(user) {
    const url = 'api/v1/user';
    return this.post(url, user);
  }

  async updateUser(user) {
    const url = 'api/v1/user';
    return this.put(url, user);
  }

  async updatePassword(username, oldPassword, newPassword) {
    const url = `api/v1/user/${username}/password`;
    const model = { username, oldPassword, newPassword };
    return this.post(url, model);
  }

  async getUserByUsername(username) {
    const url = `api/v1/user/${username}`;
    return this.get(url);
  }

  async getCoupleInfo(username) {
    const url = `api/v1/couple/${username}`;
    return this.get(url);
  }

  async getCoupleChecklist(coupleId) {
    const url = `api/v1/couple/${coupleId}/checklist`;
    return this.get(url);
  }
}

export default new GabbooApi();
