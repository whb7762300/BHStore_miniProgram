import http from "../../utils/httpRequest";

Page({
    data: {
        list: [],
        rightList: [],
        tapIndex: 0,
        rightToTop: 0
    },
    onLoad: function (options) {
        http.get("categories")
            .then(res => {
                this.setData({
                    list: res,
                    rightList: res[this.data.tapIndex].children
                })
            })
            .catch();
    },
    leftCategoryTap(e) {
        let {index} = e.mark;
        this.setData({
            tapIndex: index,
            rightList: this.data.list[index].children,
            rightToTop: 0
        })
    }
});
