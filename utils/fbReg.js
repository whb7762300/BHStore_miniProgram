
class fbReg {

    /**
     * 正则校验
     * @param {}} value 需要被校验的参数
     * @param {} reg 校验所需的正则
     */
    static regexCheck(value="",reg="^.*$") {
        var reg = new RegExp(reg);
        return reg.test(value);
    }

    /**
     * 校验：纯数字
     * @param {} value 参数
     */
    static checkNumber(value) {
        return this.regexCheck(value,"^[0-9]*$");
    }

    /**
     * 校验：数字和小数点
     * @param {} value 参数
     */
    static checkFloat(value) {
        return this.regexCheck(value,"^[0-9.]{0,}$");
    }

    /**
     * 校验：字母和数字
     * @param {} value 参数
     */
    static checkChar(value) {
        return this.regexCheck(value,"^[a-zA-Z0-9]*$");
    }

    /**
     * 校验手机号
     * @param {} value 参数
     */
    static checkPhone(value) {
        return this.regexCheck(value,"^1[0-9]{10}$");
    }

    /**
     * 校验邮箱
     * @param {} value 参数
     */
    static checkEmail(value) {
        return this.regexCheck(value,"^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");
    }

    /**
     * 校验车牌号
     * @param {*} value 参数
     */
    static checkCarNum(value) {
        return this.regexCheck(value,"^(([\u4e00-\u9fa5]{1}[A-Z]{1})[-]?|([wW][Jj][\u4e00-\u9fa5]{1}[-]?)|([a-zA-Z]{2}))([A-Za-z0-9]{5}|[DdFf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}|[0-9]{5}[DdFf])$");
    }

    /**
     * 校验身份账号
     * @param {*} value 参数
     */
    static checkIdNum(value) {
        return this.regexCheck(value,"^([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx]))$");
    }


}

export default fbReg