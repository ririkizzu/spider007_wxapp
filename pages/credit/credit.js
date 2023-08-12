const api = require('../../utils/api')
const util = require('../../utils/util')

var app = getApp()

// 在页面中定义激励视频广告
let rewardedVideoAd = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    credit: null,
    signedAt: null,
    signed: true,
    rewardedCount: 0,
    limited: 0,
  },

  getUserInfo: async function () {
    let res = await api.request('/api/user/info', 'GET', {})
    // console.log(res)
    app.globalData.credit = res.data.data.credit
    app.globalData.signedAt = res.data.data.signed_at
    app.globalData.signed = util.timestampIsToday(res.data.data.signed_at)
    app.globalData.rewardedCount = res.data.data.rewarded_count
    app.globalData.limited = res.data.data.limited
    this.setData({
      credit: app.globalData.credit,
      signedAt: app.globalData.signedAt,
      signed: app.globalData.signed,
      rewardedCount: app.globalData.rewardedCount,
      limited: app.globalData.limited,
    })
  },

  signedToast: function () {
    wx.showToast({
      title: '今日已签到',
      icon: 'none'
    })
  },

  signed: util.throttle(async function () {
    try {
      await api.request('/api/user/signed', 'GET', {})
      this.getUserInfo()
      wx.showToast({
        title: '签到成功',
        icon: 'success'
      })
    } catch (err) {
      console.log(err)
      wx.showToast({
        title: err.data,
        icon: 'none'
      })
    }
  }),

  limitedToast: function () {
    wx.showToast({
      title: '今日已达到观看次数限制，请明日再试',
      icon: 'none'
    })
  },

  //拉取广告
  showRewardedVideoAd: function () {
    if (rewardedVideoAd) {
      rewardedVideoAd.show()
        .catch(() => {
          rewardedVideoAd.load()
            .then(() => {
              rewardedVideoAd.show()
            })
            .catch((err) => {
              wx.showToast({
                title: '激励视频加载失败',
                icon: 'none'
              })
            })
        })
    }
  },

  //更新用户信息
  rewarded: async function () {
    await api.request('/api/user/rewarded', 'GET', {})
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-1a1619605af7b3b6'
      })
      rewardedVideoAd.onLoad(() => {
        console.log('激励视频 广告加载成功')
      })
      rewardedVideoAd.onError((err) => {
        console.log('激励视频 广告加载失败', err)
        wx.showToast({
          title: '激励视频加载失败',
          icon: 'none'
        })
      })
      rewardedVideoAd.onClose((res) => {
        console.log('用户点击了【关闭广告】按钮', res)
        if (res && res.isEnded) {
          this.rewarded()
          wx.showToast({
            title: '成功获得积分奖励',
            icon: 'none'
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      credit: app.globalData.credit,
      signedAt: app.globalData.signedAt,
      signed: app.globalData.signed,
      rewardedCount: app.globalData.rewardedCount,
      limited: app.globalData.limited,
    })
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})