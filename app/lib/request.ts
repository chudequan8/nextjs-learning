import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import axios from 'axios';
const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('x-auth-token');
  // if (token) {
  //   config.headers = {
  //     ...(config.headers as any),
  //     Authorization: token,
  //   };
  // }
  if (config.method === 'get') {
    const params = config.params ? JSON.stringify(config.params) : '';
    if (params.length > 300) {
      throw new Error('请求参数过长，请重新输入');
    }
  }
  // if (config.method === "post") {
  //   config.headers = {
  //     ...config.headers,
  //     "content-type": "application/x-www-form-urlencoded",
  //   };
  //   config.data = new URLSearchParams(config.data).toString();
  // }
  // console.log('config', config);
  return config;
});

instance.interceptors.response.use(
  (response) => {
    // 转化一下响应数据格式，添加一个boolean类型的success字段，提供给业务方判断！
    const res: any = response.data;

    if (response.config.responseType === 'blob') {
      return response;
    }

    if (Array.isArray(res)) {
      return res;
    }

    if (response.headers['content-type']?.includes('image')) {
      const token = response.headers.imagetoken;
      const blobUrl = window.URL.createObjectURL(res);
      return {
        token,
        blobUrl,
      };
    }

    if (res?.openapi || res?.swagger) {
      return res;
    }

    if (res.status === 200) {
      if (res.data) {
        return res.data;
      }
      return res || null;
    }

    throw {
      ...res,
      type: 'responseError',
      message: res.message || '请求失败',
    };
  },
  (err) => {
    // console.log("axios error1", err);
    if (err.response?.status === 413) {
      console.log('查询内容过长，请重新输入');
    }
    if (err.response?.status === 401) {
      console.log('登录过期');
      // 派发登出事件
      // setTimeout(doLogout, 1000);
    }
    if (err.message) {
      console.log(err.message || '请求失败');
    }
  },
);

const request = <T>(reqConfig: AxiosRequestConfig): Promise<T> => {
  return instance.request<T, T>(reqConfig);
};

export default request;
export type { AxiosInstance, AxiosResponse };
