if (!toast) var toast = {};

//展示toast参数
// 检测是否具有某属性：xiaoming.hasOwnProperty('name'); // true
var toastRes = {
    title: '',
    icon: 'success',
    duration: 1000,
    success: (res) => {
    }
}
/*Object.defineProperty(wx, 'showToast', {
    configurable: true,
    enumerable: true,
    writable: true,
    value(obj) {
        if (obj.hideLoading) {
            wx.hideLoading();
            delete obj.hideLoading;
            setTimeout(() => {
                showToast.call(this, obj);
            }, 500);
        }else{
            showToast.call(this, obj);
        }
    }
});*/
/**
 * 封装toast，默认第一个参数传toast，第二个参数传配置项
 * https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
 */
toast.showToast = function showToast(toast, param = {}) {
    //settimeout是为了解决hideloading会导致吐司无法显示的问题
    return new Promise(resolve => {
        setTimeout(args => {
            wx.showToast({
                title: typeof (toast) == "undefined" ? '成功' : toast,
                icon: typeof (param.icon) == "undefined" ? 'none' : param.icon,
                image: param.image,
                duration: typeof (param.duration) == "undefined" ? 2000 : param.duration,
                success: res => {
                    resolve(res);
                }
            })
        }, 0)
    })
}

toast.showSuccessToast = function showSuccessToast(toast, param = {}) {
    if (!param.icon) {
        param.icon = "success";
    }
    toast.showToast(toast, param);
}

toast.showErrorToast = function showErrorToast(toast, param = {}) {
    if (!param.image) {
        param.image = "/image/toast_error.png";
    }
    toast.showToast(toast, param);
}


export default toast;
