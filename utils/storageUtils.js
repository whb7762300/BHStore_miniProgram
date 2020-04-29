import CommonUtils from "./CommonUtils";

const userInfo = "user_info";
const userToken = "user_token";
const mainUrl = "main_url";
const deviceUUID = "device_UUID";
var storage = {
    setStorage: function (key, value) {
        wx.setStorageSync(key, value);
    },
    getStorage: function (key) {
        return wx.getStorageSync(key);
    },
    removeStorage: function (key) {
        wx.removeStorageSync(key);
    },
    clearStorage: function () {
        wx.clearStorageSync();
    },
    setMainUrl: function (url) {
        wx.setStorageSync(mainUrl, url);
    },
    getMainUrl: function () {
        return wx.getStorageSync(mainUrl);
    },

    setUserInfo: function (userInfoBean) {
        wx.setStorageSync(userInfo, userInfoBean)
    },
    getUserInfo: function () {
        return wx.getStorageSync(userInfo);
    },

    setToken: function (token) {
        wx.setStorageSync(userToken, token)
    },
    getToken: function () {
        return wx.getStorageSync(userToken);
    },
    isLogin: function () {
        return !CommonUtils.isEmpty(this.getToken());
    },
    setDeviceUUID(uuid) {
        wx.setStorageSync(deviceUUID, uuid);
    },
    getDeviceUUID() {
        return wx.getStorageSync(deviceUUID);
    },
    deleteAllUserInfo: function () {
        this.removeStorage(userInfo);
        this.removeStorage(userToken);
    }
};

export default storage;
