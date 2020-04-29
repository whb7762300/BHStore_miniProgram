import CommonUtils from "./CommonUtils";

var navigate = {
    dealUrlParams: function (url, params) {
        if (!CommonUtils.isEmpty(params)) {
            url = url + '?';
            for (let key in params) {
                if (params[key]) {
                    if (url.endsWith('?')) {
                        url += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                    } else {
                        url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                    }
                }
            }
        }
        return url;
    },
    navigateTo: function (url, params) {
        url = this.dealUrlParams(url, params);
        return new Promise((resolve, reject) => {
            wx.navigateTo({
                url: url,
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    },
    redirectTo: function (url, params) {
        url = this.dealUrlParams(url, params);
        return new Promise((resolve, reject) => {
            wx.redirectTo({
                url: url,
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    },
    reLaunch: function (url, params) {
        url = this.dealUrlParams(url, params);
        return new Promise((resolve, reject) => {
            wx.reLaunch({
                url: url,
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    },
    //跳至tabbar不能带参数
    switchTab: function (url) {
        url = this.dealUrlParams(url);
        return new Promise((resolve, reject) => {
            wx.switchTab({
                url: url,
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    },
    navigateBack: function (delta = 1) {
        return new Promise((resolve, reject) => {
            wx.navigateBack({
                delta: delta,
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    },
    decodeParams(params) {
        let decodeParams = {};
        if (!CommonUtils.isEmpty(params)) {
            for (let key in params) {
                if (params[key]) {
                    decodeParams[decodeURIComponent(key)] = decodeURIComponent(params[key]);
                }
            }
        }
        return decodeParams;
    }
};

export default navigate;
