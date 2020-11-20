import axios, { AxiosInstance, AxiosError, Method } from "axios"
// @ts-ignore
import {TOKEN, USERID} from '@/utils/storage'
import Cookies from 'js-cookie'
import { Dialog, Notify } from 'vant'

export interface Params {
    url: string
    method?: Method
    data?: any
}

export interface ResloveData<T = any> {
    data: T,
    msg: string
}

interface Options extends Params {
    params?: any,
    headers?: any
}

const conext: AxiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})

//响应错误处理
function handleError(error: AxiosError<ResloveData>) {
    if (!error.response) return;
    const status = error.response.status;
    switch (status) {
        case 404:
            Dialog.alert({
                title: '提示',
                message: '没找到资源地址'
            }).then(() => {});
            return;
        case 401:
            Dialog.alert({
                title: '提示',
                message: 'token已失效, 请重新登录'
            }).then(() => {
                Cookies.remove(TOKEN);
                Cookies.remove(USERID);
                location.href='/#/login'
            });
            return;
        default:
            Dialog.alert({
                title: '提示',
                message: '未知错误, 请尝试重新刷新'
            }).then(() => {
                location.reload()
            });
            return;
    }
}

export default function request<T = any>({ url, method = "get", data }: Params): Promise<T> {
    return new Promise((resolve, reject) => {
        const options: Options = {
            url: process.env.VUE_APP_HTTPS_PATH + url,
            method
        }
        const lowerMethod = method.toLowerCase();
        if (lowerMethod === 'get') {
            options.params = data;
        } else {
            options.data = data;
        }
        conext.request<T>(options)
            .then(({ data }: any) => {
                // console.log(data)
                if (data.erron === 401) {
                    Dialog.alert({
                        title: '提示',
                        message: data.message
                    }).then(() => {
                        Cookies.remove(TOKEN);
                        Cookies.remove(USERID);
                        location.href='/#/login'
                    });
                } else if (data.erron !== 401 && data.erron !== 0) {
                    Notify({type: 'danger', message: data.message})
                } else {
                    resolve(data)
                }
            })
            .catch((error: AxiosError<ResloveData>) => {
                handleError(error)
            })
    })
}