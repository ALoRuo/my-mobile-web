import axios from "axios";
// import { browserHistory } from 'react-router';
import history from './HistoryRedirection';
import querystring from 'query-string';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
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
            axios.post(url, params, config).then((res) => {
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
            axios.get(url,{
                config,
                params:{...params}
            }).then((res) => {
                _this.handleData(res, resolve, reject);
            })
        })
    }
};

export default request;
