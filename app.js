const api = require('./utils/api')
const util = require('./utils/util')

App({

  globalData: {
    id: null,
    openid: null,
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    nickName: null,
    credit: null,
    signedAt: null,
    signed: true,
    rewardedCount: 0,
    limited: 0,
  },

  setUserInfo: async function () {
    let res = await api.request('/api/user/info', 'GET', {})
    this.globalData.id = res.data.data.id
    this.globalData.openid = res.data.data.openid
    this.globalData.avatarUrl = res.data.data.avatar_url
    this.globalData.nickName = res.data.data.nick_name
    this.globalData.credit = res.data.data.credit
    this.globalData.signedAt = res.data.data.signed_at
    this.globalData.signed = util.timestampIsToday(res.data.data.signed_at)
    this.globalData.rewardedCount = res.data.data.rewarded_count
    this.globalData.limited = res.data.data.limited
  },

  checkUser: async function () {
    try {
      let res = await api.request('/api/user/check-user', 'GET', {})
      if (res.data.data != 0) {
        this.setUserInfo()
      } else {
        await api.request('/api/user/add', 'GET', {})
        this.setUserInfo()
      }
    } catch (err) {
      console.error(err)
      wx.showToast({
        title: err.data,
        icon: 'none'
      })
    }
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({
      env: 'prod-id',
      traceUser: true
    })
    this.checkUser()
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})