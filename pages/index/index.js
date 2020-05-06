//index.js
import http from "../../utils/httpRequest";

Page({
    data: {
        bannerList: [],
        menuItems:[],
        homeContent:[]
    },
    onLoad: function () {
        this.getBannerList();
        this.getMenuItems();
        this.getHomeContent();
    },
    getBannerList() {
        http.get("home/swiperdata")
            .then(res => {
                this.setData({
                    bannerList: res
                })
            })
            .catch();
    },
    getMenuItems(){
        http.get("home/catitems")
            .then(res => {
                this.setData({
                    menuItems: res
                })
            })
            .catch();
    },
    getHomeContent(){
        http.get("home/floordata")
            .then(res => {
                this.setData({
                    homeContent: res
                })
            })
            .catch();
    }
})
