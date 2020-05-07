import http from "../../utils/httpRequest";
import CommonUtils from "../../utils/CommonUtils";
import toast from "../../utils/toastUtils";

Page({
    data: {
        list: [],
        tabActive: 0
    },
    params: {
        query: "",//关键字
        cid: "",//分类id
        pagenum: 1,//页码
        pagesize: 10//页容量
    },
    onLoad: function (options) {
        let {cid = '', query = ''} = options;
        this.params.query = query;
        this.params.cid = cid;
        this.getList();
    },
    onPullDownRefresh() {
        this.setData({
            list: []
        })
        this.params.pagenum = 1;
        this.getList();
    },
    onReachBottom() {
        this.params.pagenum++;
        this.getList();
    },
    getList() {
        let isLoadMore = this.params.pagenum !== 1;
        http.get("goods/search", this.params)
            .then(res => {
                wx.stopPullDownRefresh();
                if (isLoadMore) {//加载更多
                    if (CommonUtils.isEmpty(res.goods)) {
                        toast.showToast("没有更多数据了")
                    } else {
                        this.setData({
                            list: [...this.data.list, ...res.goods]
                        })
                    }
                } else {//初始化或下拉刷新
                    this.setData({
                        list: res.goods
                    })
                }
            })
            .catch(res => {
                wx.stopPullDownRefresh();
                if (isLoadMore) {//加载更多
                    this.params.pagenum--;
                }
            });
    },
    onTabChange(e) {
        console.log(e.detail.name);
    }
});
