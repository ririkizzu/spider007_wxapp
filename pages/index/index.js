const api = require('../../utils/api')
const util = require('../../utils/util')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: ''
  },

  inputHandle: function (e) {
    console.log(e.detail.value)
    this.setData({
      phoneNum: e.detail.value
    })
  },

  scanRequest: function () {
    const regex = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    if (this.data.phoneNum == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else if (!regex.test(this.data.phoneNum)) {
      wx.showToast({
        title: '手机号非法，请重新输入',
        icon: 'none'
      })
    } else {
      if (app.globalData.credit >= 5) {
        this.registerScan()
      } else {
        wx.showToast({
          title: '积分不足，请前往“我的-积分中心”领取积分',
          icon: 'none'
        })
      }
    }
  },

  registerScan: util.throttle(async function () {
    wx.showLoading({
      title: '正在查询中...',
    })

    let data = {
      phone_num: Number(this.data.phoneNum)
    }
    try {
      let res = await api.request('/api/register/scan', 'POST', data)
      console.log(res)
      wx.hideLoading()
      let dataJson = JSON.stringify(res.data.data)
      //得到扫描结果后，先扣积分
      await api.request('/api/user/update-credit', 'POST', {
        credit: -5
      })
      app.globalData.credit -= 5
      //再跳转扫描结果页，将navigateTo替换为redirectTo，解决navigateTo插屏广告自动关闭问题
      wx.navigateTo({
        url: '/pages/register_info/register_info?data=' + encodeURIComponent(dataJson),
      })
    } catch (err) {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        title: err.data,
        icon: 'none'
      })
    }
  }, 15000),

  getPlatformList: async function () {
    let res = await api.request('/api/platform/list', 'GET', null)
    // console.log(res)
    let dataJson = JSON.stringify(res.data.data)
    //跳转平台结果页
    wx.navigateTo({
      url: '/pages/platform/platform?data=' + encodeURIComponent(dataJson),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})