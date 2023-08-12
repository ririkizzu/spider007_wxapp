const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//判断今日是否签到
const timestampIsToday = timestamp => {
  const dateTime = new Date(timestamp)
  const date = [dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate()].join('/')
  // console.log(date)
  const todayDate = new Date()
  const today = [todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate()].join('/')
  // console.log(today)
  if (date == today) {
    return true
  } else {
    return false
  }
}

//限流函数
const throttle = (fn, interval) => {
  let enterTime = 0
  let gapTime = interval || 1000
  return function () {
    let context = this
    let backTime = new Date()
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments)
      enterTime = backTime
    }
  }
}

module.exports = {
  formatTime,
  timestampIsToday,
  throttle
}