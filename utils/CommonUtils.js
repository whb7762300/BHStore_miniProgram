class CommonUtils {
    /**
     * 判断是否为空
     */
    static isEmpty(value) {
        if (value == null || value == undefined) return true
        if (this.judgeString(value)) {
            if (value.trim().length == 0) return true
        } else if (this.judgeArray(value)) {
            if (value.length == 0) return true
        } else if (this.judgeObject(value)) {
            for (let name in value) return false
            return true
        }
        return false;
    }

    /**
     * 判断数组是否为空
     */
    static isArrayEmpty(value) {
        return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
    }

    static judgeString(value) {
        return value != null && value != undefined && value.constructor == String
    }

    static judgeNumber(value) {
        return value != null && value != undefined && value.constructor == Number
    }

    static judgeBoolean(value) {
        return value != null && value != undefined && value.constructor == Boolean
    }

    static judgeArray(value) {
        return value != null && value != undefined && value.constructor == Array
    }

    static judgeObject(value) {
        return value != null && value != undefined && value.constructor == Object
    }

    static judgeFunction(value) {
        return value != null && value != undefined && value.constructor == Function
    }

    /**
     * 合并
     */
    static mergeObject() {
        let newObject = {}
        for (let a = 0; a < arguments.length; a++) {
            let mergeObject = arguments[a]
            for (let prototype in mergeObject) {
                let mergeObjectPrototype = mergeObject[prototype]
                if (this.judgeObject(mergeObjectPrototype)) {
                    newObject[prototype] = this.mergeObject({}, mergeObjectPrototype)
                } else if (this.judgeArray(mergeObjectPrototype) && this.judgeObject(mergeObjectPrototype[0])) {
                    let newArray = []
                    for (let b = 0; b < mergeObjectPrototype.length; b++) {
                        newArray.push(this.mergeObject({}, mergeObjectPrototype[a]))
                    }
                    newObject[prototype] = newArray
                } else {
                    newObject[prototype] = mergeObjectPrototype
                }
            }
        }
        return newObject
    }

    static getApp() {
        return getApp()
    }

    static getCurrentPages() {
        return getCurrentPages()
    }

    static getCurrentPage() {
        let pages = this.getCurrentPages()
        return pages[pages.length - 1]
    }

    static getCurrentPath() {
        return this.getCurrentPage().__route__
    }

    static getPath(targetPath) {
        let currentPath = this.getCurrentPath()
        return this.getRelativePath(currentPath, targetPath)
    }

    static getRelativePath(currentPath, targetPath) {
        let currentPathArray = currentPath.split('/')
        let targetPathArray = targetPath.split('/')
        let samePath = false
        let levelNumber = 0
        let relativePath = ''
        for (let a = 0; a < currentPathArray.length; a++) {
            let currentPathData = currentPathArray[a]
            for (let b = 0; b < targetPathArray.length; b++) {
                let targetPathData = targetPathArray[b]
                if (targetPathData == currentPathData) {
                    levelNumber = currentPathArray.length - b - 1
                    samePath = true
                    break
                }
            }
        }
        if (samePath) {
            for (let a = 0; a < levelNumber - 1; a++) {
                relativePath += '../'
            }
            for (let a = levelNumber; a > 0; a--) {
                let targetPathData = targetPathArray[a]
                if (a == 1) relativePath += targetPathData
                else relativePath += targetPathData + '/'
            }
        } else {
            levelNumber = currentPathArray.length - 1
            for (let a = 0; a < levelNumber; a++) {
                relativePath += '../'
            }
            for (let a = 0; a < targetPathArray.length; a++) {
                let targetPathData = targetPathArray[a]
                if (a == targetPathArray.length - 1) relativePath += targetPathData
                else relativePath += targetPathData + '/'
            }
        }
        return relativePath
    }

    static getTimestamp() {
        return Date.parse(new Date())
    }

    static getClassName(params) {
        if (this.isEmpty(params)) return ''
        if (!this.judgeObject(params)) {
            console.error('expect object params')
            return ''
        }
        let className = ''
        for (var name in params) {
            if (params[name]) className += ' ' + name
        }
        return className.replace(/ /, '')
    }

    static isSimplePhone(phone) {
        return phone && phone.length === 11 && phone.startsWith("1");
    }

    static formatDate(datetime) {
        var date = new Date(datetime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var year = date.getFullYear(),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            sdate = ("0" + date.getDate()).slice(-2),
            hour = ("0" + date.getHours()).slice(-2),
            minute = ("0" + date.getMinutes()).slice(-2),
            second = ("0" + date.getSeconds()).slice(-2);
        // 拼接
        var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
        // 返回
        return result;
    }

    static formatDateFormater(date = 0, fmt = 'yyyy-MM-dd hh:mm:ss') {
        date = new Date(+date)
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
            }
        }
        return fmt;
    }

    static hidePhone(mobilePhone) {
        if (!CommonUtils.isEmpty(mobilePhone) && Number(mobilePhone) && String(mobilePhone).length === 11) {
            var mobile = String(mobilePhone);
            var reg = /^(\d{3})\d{4}(\d{4})$/;
            return mobile.replace(reg, '$1****$2');
        } else {
            return mobilePhone
        }
    }

    static hideCardNum(cardNum) {
        if (CommonUtils.isEmpty(cardNum)) {
            return cardNum;
        } else {
            return cardNum.substr(0, 4) + '**********' + cardNum.substr(14, cardNum.split('').length);
        }
    }

    static hideName(name) {
        if (CommonUtils.isEmpty(name)) {
            return name;
        }
        if (name.length === 2) {
            return name.substr(0, 1) + '*';
        } else if (name.length > 2) {
            let start = name.substr(0, 1);
            let end = name.substr(name.length - 1, 1);
            let middle = "";
            for (let i = 0; i < (name.length - 2); i++) {
                middle += '*';
            }
            return start + middle + end;
        } else {
            return name;
        }
    }

    // 'develop',    //开发版
    // 'trial',      //体验版
    // 'release',    //正式版
    static isRelease() {
        return __wxConfig.envVersion === "release";
    }

    static log(...message) {
        if (!this.isRelease()) {
            console.log(...message);
        }
    }

}

export default CommonUtils
