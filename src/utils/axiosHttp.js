import axios from "axios";
import history from './HistoryRedirection';
import querystring from 'query-string';


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = axios.create({
    headers: {"X-Requested-With": "XMLHttpRequest"}
});
//添加一个请求拦截器
instance.interceptors.request.use(function (config) {
   let token = localStorage.getItem('token');
   console.log(token)
    if (token && config.url.indexOf('login')<0) {
        config.headers.common['token'] = token;
    }
    return config;
}, function (error) {
    // Do something with request error

    return Promise.reject(error);
});
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        let status = error.response?error.response.status:'';
        switch (status){
            case 401:history.push('/login');break;
        }
        return Promise.reject('请登录')   // 返回接口返回的错误信息
    });
/*
    function serversToClient (response) {

    // 成功
    if (response.data && response.data.head && response.data.head.code === "00000000") {

        return Promise.resolve(response.data.body);

    } else if (response.data && response.data.head && response.data.head.code === "11111114") { // 2.session过期

        message.warning("登录已失效，请重新登录");
        if (commInfo.isXSBFlag) {
            window.location = "/openxsb-web/index.html#/login";
        } else {
            window.location = "/manage/index.html#quit";
        }

    } else {

        return Promise.reject(response.data);

    }

    /*
     * 3.其他失败，比如校验不通过等
     * Response.data.otherError = true;
     */
    // return Promise.reject({
    //     messageCode: "netError"
    // });
    //
    // }

const request = {
    handleData: function (res, resolve, reject) {
        let result = res.data;
        if (result.code === 200) {
            resolve(result.data);
        }else {
            // message.destroy();
            // let code = data.head.code,
            //     errorInfo = data.head.msg;
            // if (code === "11111114") {
            //     history.push("/login");
            //     message.error(errorInfo, 2);
            //     return;
            // }
            // message.error(errorInfo, 3);
            reject && reject(result);
        }
    },
    post: function (url, params, type) {
        let _this = this,
            config = {};
        if (type && type === "json") {
            config = {
                headers: {
                    // token:window.commInfo.token,
                    post: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        } else if (type && type === "file") {
            config = {
                headers: {
                    // token:window.commInfo.token,
                    post: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            }
        } else {
            params = querystring.stringify(params);
        }
        return new Promise((resolve, reject) => {
            instance.post(url, params, config).then((res) => {
                _this.handleData(res, resolve, reject);
            })
        })
    },
    get: function (url,params,type) {
        let _this = this,config = {};
        //不需要传参数时 param传{}
        return new Promise((resolve, reject) => {
            if (type && type === "json") {
                config = {
                    headers: {
                        // token:window.commInfo.token,
                        post: {
                            'Content-Type': 'application/json'
                        }
                    }
                }
            } else if (type && type === "file") {
                config = {
                    headers: {
                        // token:window.commInfo.token,
                        post: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                }
            } else {
                params = params;
            }
            instance.get(url,{
                config,
                params:{...params}
            }).then((res) => {
                _this.handleData(res, resolve, reject);
            })
        })
    }
};

export default request;
