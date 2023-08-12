const request = (_url, _method, _data, _callComplete) => {
  return new Promise((resolve, reject) => {
    wx.cloud.callContainer({
      path: _url,
      method: _method,
      data: _data,
      header: {
        'X-WX-SERVICE': 'spiderman',
      },
      success: (res) => {
        if (res.statusCode != 200) {
          reject(res)
        } else {
          resolve(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: (res) => {
        if (_callComplete) {
          _callComplete()
        }
      }
    })
  })
}

module.exports = {
  request
}