import axios from "axios";
import { getStore } from "./storage";

const http = axios.create({ //https://trylive.top
  baseURL: process.env.NODE_ENV === "production" ? "https://trylive.top" : "http://localhost:8300/",
  /*timeout: 3000,*/
});

//请求拦截处理
http.interceptors.request.use(function (config) {
    // 在发送请求之前
    config.headers.Authorization = getStore('token')
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// @ts-ignore
export const get = (url: string, params: object = {}) => {
    return http({
        method: "get",
        url,
        params,
    })
        .then((result) => {
            return result.data;
        })
        .catch((err) => {
            return err.message;
        });
};
// @ts-ignore
export const del = (url: string) => {
    return http({
        method: "delete",
        url,
    })
        .then((result) => {
            return result.data;
        })
        .catch((err) => {
            return err.message;
        });
};
// @ts-ignore
export const post = ({url}, params: object) => {
    return http({
        method: "post",
        url,
        data: params,
    })
        .then((result) => {
            return result.data;
        })
        .catch((err) => {
            return err.message;
        });
};
// @ts-ignore
export const puts = ({url}, params: object) => {
    return http({
        method: "put",
        url,
        data: params,
    })
        .then((result) => {
            return result.data;
        })
        .catch((err) => {
            return err.message;
        });
};
