Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultImage: String, //默认图片
    originalImage: String, //请求的图片
    width: String,
    height: String,
    mode: String,
    showMenuByLongpress: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    finishedFlag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishedFlag: true
      })
    }
  }
})