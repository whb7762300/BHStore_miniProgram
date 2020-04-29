import toast from "./toastUtils";

if (!http) var http = {};
const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
let ajaxTimes = 0;//同时网络请求的并发数量

function request(url = "", params = {}, method = "POST", showLoading = true) {
    if (!url.startsWith("http")) {
        url = baseUrl + url;
    }
    if (method === "get") {
        method = "GET";
    }
    if (method === "post") {
        method = "POST";
    }
    return new Promise((resolve, reject) => {
        if (showLoading) {
            ajaxTimes++;
            wx.showLoading({title: '加载中...'});
        }
        wx.request({
            url: url,
            data: params,
            method: method,
            success(res) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    let data = res.data ? res.data : {};
                    //解决对象值改变后,日志输入的对象也跟着变化
                    console.log(url + "返回数据:\n", JSON.parse(JSON.stringify(data)));
                    if (data.meta == null || typeof (data.meta) == "undefined") {
                        resolve(data);
                    } else if (data.meta.status === 200) {
                        resolve(data);
                    } else {
                        reject(data.meta.msg);
                        toast.showToast(data.meta.msg);
                    }
                } else {
                    reject("请求失败，请稍后再试");
                    toast.showToast("请求失败，请稍后再试");
                }
            },
            fail(res) {
                reject("请求失败，请稍后再试");
                toast.showToast("请求失败，请稍后再试");
            },
            complete() {
                if (showLoading) {
                    ajaxTimes--;
                    if (ajaxTimes === 0) {
                        wx.hideLoading();
                    }
                }
            }
        });
    });
}

function upload(url, filePath, formData = {}) {
    if (!url.startsWith("http")) {
        url = baseUrl + url;
    }
    return new Promise((resolve, reject) => {
        wx.showLoading({title: '上传中...'});
        wx.uploadFile({
            url,
            filePath,
            name: 'file',
            formData,
            success(res) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    let data = res.data ? res.data : {};
                    //解决对象值改变后,日志输入的对象也跟着变化
                    console.log(url + "返回数据:\n", JSON.parse(JSON.stringify(data)));
                    if (data.meta == null || typeof (data.meta) == "undefined") {
                        resolve(data);
                    } else if (data.meta.status === 200) {
                        resolve(data);
                    } else {
                        reject(data.meta.msg);
                        toast.showToast(data.meta.msg);
                    }
                } else {
                    reject("请求失败，请稍后再试");
                    toast.showToast("请求失败，请稍后再试");
                }
            },
            fail(res) {
                reject("请求失败，请稍后再试");
                toast.showToast("请求失败，请稍后再试");
            },
            complete() {
                wx.hideLoading();
            }
        })
    })
}


http.get = function (url, params) {
    return request(url, params, "GET");
};

http.post = function (url, params) {
    return request(url, params);
};

http.getNoLoading = function (url, params) {
    return request(url, params, "GET", false);
};

http.postNoLoading = function (url, params) {
    return request(url, params, "POST", false);
};

http.upload = function (url, filePath, formData) {
    return upload(url, filePath, formData)
}

export const getRequest = (url, params) => {
    return request(url, params, "GET");
};

export const postRequest = (url, params) => {
    return request(url, params);
};

export default http;
