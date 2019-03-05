import axios from "axios";
// import { browserHistory } from 'react-router';
import history from './HistoryRedirection';
import querystring from 'query-string';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const request = {
    handleData: function (res, resolve, reject) {
        let data = res.data;
        if (data.head && data.head.status === "Y") {
            resolve(data.body);
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
            reject && reject(data);
        }
    },
    post: function (url, params, type) {
        let _this = this,
            config = {};
        if (type && type === "json") {
            config = {
                headers: {
                    post: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        } else if (type && type === "file") {
            config = {
                headers: {
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
    get: function (url,param) {
        let _this = this;
        //不需要传参数时 param传{}
        return new Promise((resolve, reject) => {
            axios.get(url,{params:{...param}}).then((res) => {
                _this.handleData(res, resolve, reject);
            })
        })
    }
};

export default request;
