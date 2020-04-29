/**
 * promise 形式  getSetting
 */
export const getSetting = (withSubscriptions = false) => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            withSubscriptions,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}
/**
 * promise 形式  chooseAddress
 */
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

/**
 * promise 形式  openSetting
 */
export const openSetting = (withSubscriptions = false) => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            withSubscriptions,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

/**
 *  promise 形式  showModal
 */
export const showModal = (params) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            ...params,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

export const showActionSheet = (params) => {
    return new Promise((resolve, reject) => {
        wx.showActionSheet({
            ...params,
            success(res) {
                resolve(res);
            },
            fail(res) {
                reject(res);
            }
        })
    });
}

/**
 * promise 形式  login
 */
export const login = (timeout = 10000) => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

/**
 * promise 形式的 小程序的微信支付
 * @param {object} params 支付所必要的参数
 */
export const requestPayment = (params) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...params,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

/**
 * 赋值到剪贴板
 * @param data
 * @returns {Promise<unknown>}
 */
export const setClipboardData = (data) => {
    return new Promise((resolve, reject) => {
        wx.setClipboardData({
            data,
            success: (res) => {
                resolve(res);
            },
            fail: res => {
                reject(res);
            }
        });
    })
}

/**
 * 选取图片
 * @param params
 * @returns {Promise<unknown>}
 */
export const chooseImage = (params) => {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            ...params,
            success(res) {
                resolve(res);
            },
            fail(res) {
                reject(res);
            }
        })
    })
}

