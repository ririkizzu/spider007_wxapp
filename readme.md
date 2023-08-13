# 蜘蛛007-微信小程序

## 项目介绍

蜘蛛007微信小程序，一键查询你的手机号码在哪些App和网站平台上注册过账号

## 注意事项

依赖 [spider007](https://github.com/ririkizzu/spider007) 提供的接口

## 快速开始

在 `app.js` 的 `onLaunch` 函数中初始化微信云托管环境

```javascript
wx.cloud.init({
  env: '你的微信云托管环境ID',
  traceUser: true
})
```

## 演示
视频演示：https://www.bilibili.com/video/BV1aV4y1v7df/

## 小程序预览
![蜘蛛007](./example/spider007.jpg)