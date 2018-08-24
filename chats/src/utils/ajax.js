const baseUrl = 'http://127.0.0.1:7001'
const Ajax = function (options) {
  /**
   *   options属性
   *   showLoading 默认显示loading状态
   *   showErr  默认显示错误提示
   *   errorDefault 如果存在  会将res信息传入， 可以在errorDefault里获取然后处理
   */

  if (options.showLoading) {
    options.showLoading && wx.showLoading({
      title: options.loadingMsg || '加载中',
      mask: true
    })
  }
  const requestOptions = Object.assign({}, options,
    {
      header: {
        "Accept": "application/json"
      },
      url: baseUrl + options.url,
      fail: function (res) {
        console.log(res);
        options.fail && options.fail(res)
      },
      success(res) {
        options.success(res.data)
      }
    })

  wx.request(requestOptions)
}


export default Ajax
